export const COOLDOWN_KEY = "signupCooldownUntil";

export function setCooldown(ms: number) {
  localStorage.setItem(COOLDOWN_KEY, (Date.now() + ms).toString());
}

export function getCooldownLeft() {
  const v = localStorage.getItem(COOLDOWN_KEY);
  if (!v) return 0;
  const diff = parseInt(v) - Date.now();
  return diff > 0 ? diff : 0;
}
