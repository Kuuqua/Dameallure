import { siteConfig } from "@/data/site";

export function buildGiftCurationMessage(data) {
  const lines = [
    "New Gift Curation request 🤍",
    "",
    `Who: ${data.who || "—"}`,
    `Occasion: ${data.occasion || "—"}`,
    `Budget: ${data.budget || "—"}`,
    `Style/personality: ${Array.isArray(data.style) ? data.style.join(", ") || "—" : data.style || "—"}`,
  ];

  if (data.interests) lines.push(`Interests: ${data.interests}`);
  if (data.message) lines.push(`Message: ${data.message}`);

  lines.push("");
  lines.push(`Name: ${data.name || "—"}`);
  lines.push(`Phone: ${data.phone || "—"}`);

  return lines.join("\n");
}

export function giftCurationWhatsAppLink(data) {
  const message = buildGiftCurationMessage(data);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Stub: in production this would POST to an email/CRM endpoint.
export async function submitGiftCuration(data) {
  return { ok: true, data };
}
