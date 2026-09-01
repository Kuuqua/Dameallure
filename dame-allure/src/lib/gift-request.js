import { siteConfig } from "@/data/site";

export function buildGiftRequestMessage(data) {
  const lines = [
    "New Gift Edit request 🤍",
    "",
    `Recipient: ${data.recipient || "—"}`,
    `Occasion: ${data.occasion || "—"}`,
    `Budget: ${data.budget || "—"}`,
    `Style: ${Array.isArray(data.style) ? data.style.join(", ") || "—" : data.style || "—"}`,
  ];

  if (data.colours) lines.push(`Colours: ${data.colours}`);
  if (data.personalMessage) lines.push(`Personal message: ${data.personalMessage}`);
  if (data.deliveryDate) lines.push(`Delivery date: ${data.deliveryDate}`);

  lines.push("");
  lines.push(`Name: ${data.name || "—"}`);
  lines.push(`Phone: ${data.phone || "—"}`);

  return lines.join("\n");
}

export function giftRequestWhatsAppLink(data) {
  const message = buildGiftRequestMessage(data);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Stub: in production this would POST to an email/CRM endpoint.
export async function submitGiftRequest(data) {
  return { ok: true, data };
}
