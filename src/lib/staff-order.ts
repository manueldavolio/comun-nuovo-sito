type StaffLike = {
  role: string;
  name: string;
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getRolePriority(role: string): number {
  const normalizedRole = normalize(role);

  if (normalizedRole.includes("vice allenatore")) return 1;
  if (normalizedRole.includes("allenatore")) return 0;
  if (normalizedRole.includes("preparatore portieri")) return 2;
  if (normalizedRole.includes("coordinatore") || normalizedRole.includes("coordinatrice")) return 3;
  if (normalizedRole.includes("responsabile")) return 4;
  if (normalizedRole.includes("collaboratore")) return 5;
  return 6;
}

export function sortStaffByRolePriority<T extends StaffLike>(members: T[]): T[] {
  return [...members].sort((a, b) => {
    const roleDiff = getRolePriority(a.role) - getRolePriority(b.role);
    if (roleDiff !== 0) return roleDiff;
    return a.name.localeCompare(b.name, "it");
  });
}
