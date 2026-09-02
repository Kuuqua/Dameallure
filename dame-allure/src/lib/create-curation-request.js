import { siteConfig } from "@/data/site";

export function buildCurationRequestMessage(data) {
  const lines = [
    "New Create Your Curation request 🤍",
    "",
    `Shopping for: ${data.shoppingFor || "—"}`,
    `Preparing for: ${data.occasion || "—"}`,
    `Budget: ${data.budget || "—"}`,
    `What she needs: ${Array.isArray(data.needs) ? data.needs.join(", ") || "—" : data.needs || "—"}`,
    `Style: ${Array.isArray(data.style) ? data.style.join(", ") || "—" : data.style || "—"}`,
  ];

  if (data.clothingSize) lines.push(`Clothing size: ${data.clothingSize}`);
  if (data.shoeSize) lines.push(`Shoe size: ${data.shoeSize}`);
  if (data.colourPreferences) lines.push(`Colour preferences: ${data.colourPreferences}`);
  if (data.additionalNotes) lines.push(`Additional notes: ${data.additionalNotes}`);

  lines.push("");
  lines.push(`Name: ${data.name || "—"}`);
  lines.push(`Phone: ${data.phone || "—"}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.whatsapp) lines.push(`WhatsApp: ${data.whatsapp}`);

  return lines.join("\n");
}

export function curationRequestWhatsAppLink(data) {
  const message = buildCurationRequestMessage(data);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Stub: in production this would POST to an email/CRM endpoint.
// Kept separate from the form component so it's a one-line swap later.
export async function submitCurationRequest(data) {
  return { ok: true, data };
}
