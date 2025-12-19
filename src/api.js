export async function getBadgeConfig(shopDomain) {
  const res = await fetch(`/api/badge-config?shop=${shopDomain}`);
  return res.json();
}

export async function saveBadgeConfig(body) {
  const res = await fetch("/api/badge-config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}
