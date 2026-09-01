import { siteConfig } from "@/data/site";

export function buildEditRequestMessage(data) {
  const lines = [
    "New Create Your Edit request 🤍",
    "",
    `Shopping for: ${data.shoppingFor || "—"}`,
    `Occasion: ${data.occasion || "—"}`,
    `Budget: ${data.budget || "—"}`,
    `Style: ${Array.isArray(data.style) ? data.style.join(", ") || "—" : data.style || "—"}`,
  ];

  if (data.clothingSize) lines.push(`Clothing size: ${data.clothingSize}`);
  if (data.shoeSize) lines.push(`Shoe size: ${data.shoeSize}`);
  if (data.preferredColours) lines.push(`Preferred colours: ${data.preferredColours}`);
  if (data.coloursToAvoid) lines.push(`Colours to avoid: ${data.coloursToAvoid}`);
  if (data.fragrancePreference) lines.push(`Fragrance preference: ${data.fragrancePreference}`);
  if (data.specialRequests) lines.push(`Special requests: ${data.specialRequests}`);
  if (data.requiredDate) lines.push(`Required by: ${data.requiredDate}`);
  if (data.deliveryLocation) lines.push(`Delivery location: ${data.deliveryLocation}`);

  lines.push("");
  lines.push(`Name: ${data.name || "—"}`);
  lines.push(`Phone: ${data.phone || "—"}`);
  if (data.email) lines.push(`Email: ${data.email}`);

  return lines.join("\n");
}

export function editRequestWhatsAppLink(data) {
  const message = buildEditRequestMessage(data);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Stub: in production this would POST to an email/CRM endpoint.
// Kept separate from the form component so it's a one-line swap later.
export async function submitEditRequest(data) {
  return { ok: true, data };
}
