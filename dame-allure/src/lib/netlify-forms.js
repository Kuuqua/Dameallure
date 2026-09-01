export async function submitToNetlify(formName, data) {
  const params = new URLSearchParams({ "form-name": formName });
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, Array.isArray(value) ? value.join(", ") : String(value));
  });

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    return res.ok;
  } catch {
    // Netlify Forms only works on a real Netlify deploy — this fails
    // harmlessly in local dev, which is expected.
    return false;
  }
}
