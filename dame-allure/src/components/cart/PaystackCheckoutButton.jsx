"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { siteConfig } from "@/data/site";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { playConfirmChime } from "@/lib/sound";

const PAYSTACK_SRC = "https://js.paystack.co/v1/inline.js";

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const existing = document.querySelector(`script[src="${PAYSTACK_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = PAYSTACK_SRC;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// Asks OUR OWN server (a Netlify Function, never the browser) to confirm
// with Paystack directly that this transaction really went through, using
// the secret key that only the server holds. The Paystack popup's
// `callback` firing is not proof of payment on its own — anyone can
// trigger it from devtools — so nothing here is treated as "paid" until
// this comes back verified.
async function verifyPayment({ reference, email, items, subtotal }) {
  try {
    const res = await fetch("/.netlify/functions/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, email, items, subtotal }),
    });
    const data = await res.json();
    return data;
  } catch {
    return { verified: false, error: "Could not reach the server to confirm your payment." };
  }
}

export default function PaystackCheckoutButton() {
  const { items, subtotal, clear, setOpen } = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | verifying | success | failed
  const [error, setError] = useState("");
  const isPlaceholderKey = siteConfig.paystackPublicKey.includes("replace_with");

  useEffect(() => {
    // Warm the script in the background so the popup opens instantly on click.
    loadPaystackScript().catch(() => {});
  }, []);

  const handlePay = async () => {
    if (!email || items.length === 0) return;
    setStatus("loading");
    setError("");

    if (isPlaceholderKey) {
      // No real key configured yet — this is where a live payment would
      // normally happen. Kept as a clearly-labelled stand-in so the flow
      // is demoable without a Paystack account. No server verification
      // runs here because there is no real transaction to verify.
      window.setTimeout(() => {
        setStatus("success");
        playConfirmChime();
        clear();
      }, 900);
      return;
    }

    try {
      await loadPaystackScript();
      const handler = window.PaystackPop.setup({
        key: siteConfig.paystackPublicKey,
        email,
        amount: Math.round(subtotal * 100), // pesewas
        currency: "GHS",
        ref: `dame-allure-${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Order Items",
              variable_name: "order_items",
              value: items.map((i) => `${i.name} x${i.quantity}`).join("; "),
            },
          ],
        },
        callback: (response) => {
          // The popup says it went through — now prove it server-side
          // before touching the cart or showing "payment received".
          setStatus("verifying");
          verifyPayment({ reference: response.reference, email, items, subtotal }).then((result) => {
            if (result.verified) {
              setStatus("success");
              playConfirmChime();
              clear();
            } else {
              setStatus("failed");
              setError(
                result.error ||
                  "We couldn't confirm this payment. If you were charged, please contact us before trying again."
              );
            }
          });
        },
        onClose: () => {
          setStatus((current) => (current === "verifying" ? current : "idle"));
        },
      });
      handler.openIframe();
    } catch {
      setStatus("idle");
      setError("Could not open the payment window. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="font-display text-lg text-plum">Payment received.</p>
        <p className="mt-2 text-[13px] text-charcoal/80">
          Thank you — a confirmation is on its way to {email}.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-[12px] uppercase tracking-[0.08em] text-plum/70 underline decoration-gold underline-offset-4"
        >
          Continue browsing
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          id="checkout-email"
          label="Email for receipt"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type="button"
        variant="primary"
        className="w-full"
        disabled={!email || status === "loading" || status === "verifying"}
        onClick={handlePay}
      >
        {status === "loading"
          ? "Opening secure payment…"
          : status === "verifying"
            ? "Confirming your payment…"
            : `Pay GH₵${subtotal.toLocaleString()} with Paystack`}
      </Button>
      {status === "failed" ? (
        <p className="mt-2 text-[12px] text-red-700">{error}</p>
      ) : null}
      {isPlaceholderKey ? (
        <p className="mt-2 text-[11px] text-charcoal/50">
          Test mode — set a real Paystack key in src/data/site.js to accept
          live payments.
        </p>
      ) : null}
    </div>
  );
}
