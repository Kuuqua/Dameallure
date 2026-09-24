// Server-side Paystack transaction verification.
//
// This is the piece a demo checkout cannot skip: the browser cannot be
// trusted to say "the payment succeeded" — anyone can fire that callback
// from devtools without paying a cedi. This function re-checks the
// transaction directly with Paystack, using the SECRET key, which only
// ever lives here (a Netlify environment variable) and is never sent to
// the browser.
//
// Required environment variable (set in Netlify: Site settings → Environment
// variables — never in site.js or any client-side file):
//   PAYSTACK_SECRET_KEY   e.g. sk_live_xxxxx or sk_test_xxxxx
//
// Optional, for an email notification when a payment verifies successfully
// (see README.md "Going live" section for setup):
//   RESEND_API_KEY           API key from resend.com
//   ORDER_NOTIFICATION_EMAIL Where order notifications should be sent
//   ORDER_FROM_EMAIL         The "from" address Resend sends as (must be a
//                            domain you've verified with Resend)
//
// If the Resend variables aren't set, verification still works fully —
// the email step is skipped rather than failing the request, since a
// missing notification email should never be able to make a real,
// verified payment look like it failed.

const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        verified: false,
        error:
          "PAYSTACK_SECRET_KEY is not configured on the server. Set it in Netlify's environment variables before accepting real payments.",
      }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ verified: false, error: "Invalid request body" }) };
  }

  const { reference, email, items, subtotal } = payload;
  if (!reference || typeof reference !== "string") {
    return { statusCode: 400, body: JSON.stringify({ verified: false, error: "Missing payment reference" }) };
  }

  let paystackData;
  try {
    const res = await fetch(`${PAYSTACK_VERIFY_URL}${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const json = await res.json();
    if (!res.ok || !json.status) {
      return {
        statusCode: 200,
        body: JSON.stringify({ verified: false, error: json.message || "Paystack could not find this transaction." }),
      };
    }
    paystackData = json.data;
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ verified: false, error: "Could not reach Paystack to verify this payment." }),
    };
  }

  // Paystack's own record of the transaction is the source of truth for
  // whether it succeeded and how much was actually paid — never trust the
  // amount the browser sends.
  const reallyPaid = paystackData.status === "success";
  const amountPaidGHS = paystackData.amount / 100;

  if (!reallyPaid) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        verified: false,
        error: `Payment status from Paystack: ${paystackData.status}.`,
      }),
    };
  }

  // Best-effort order notification email. This never blocks or fails the
  // verification response — a verified payment is still a verified
  // payment even if the notification email can't be sent.
  let emailSent = false;
  try {
    emailSent = await sendOrderNotification({
      reference,
      email: email || paystackData.customer?.email,
      amountPaidGHS,
      items,
      subtotal,
    });
  } catch {
    emailSent = false;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      verified: true,
      reference,
      amountPaidGHS,
      emailSent,
    }),
  };
};

async function sendOrderNotification({ reference, email, amountPaidGHS, items, subtotal }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  const from = process.env.ORDER_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const itemsList = Array.isArray(items) && items.length
    ? items
        .map(
          (i) =>
            `<li>${escapeHtml(i.name)} — ${i.size ? `Size ${escapeHtml(i.size)}, ` : ""}${
              i.color ? `${escapeHtml(i.color)}, ` : ""
            }Qty ${i.quantity} — GH₵${(i.price * i.quantity).toLocaleString()}</li>`
        )
        .join("")
    : "<li>(Item details unavailable)</li>";

  const html = `
    <h2>New Dame Allure order</h2>
    <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
    <p><strong>Customer email:</strong> ${escapeHtml(email || "unknown")}</p>
    <p><strong>Amount paid:</strong> GH₵${amountPaidGHS.toLocaleString()}</p>
    ${subtotal && Math.abs(subtotal - amountPaidGHS) > 0.5 ? `<p style="color:#a33"><strong>Note:</strong> cart subtotal (GH₵${subtotal.toLocaleString()}) differs from the amount actually paid — double-check this order.</p>` : ""}
    <p><strong>Items:</strong></p>
    <ul>${itemsList}</ul>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New order — GH₵${amountPaidGHS.toLocaleString()} (${reference})`,
      html,
    }),
  });

  return res.ok;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}
