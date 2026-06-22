import { StaffCard } from "@/components/staff/StaffCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sortStaffByRolePriority } from "@/lib/staff-order";
import type { StaffMember } from "@/types/site";

type StaffCategorySectionProps = {
  title: string;
  subtitle?: string;
  members: StaffMember[];
};

export function StaffCategorySection({ title, subtitle, members }: StaffCategorySectionProps) {
  if (members.length === 0) return null;
  const sortedMembers = sortStaffByRolePriority(members);

  const sectionId = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <section id={sectionId} className="scroll-section">
      <SectionHeading title={title} subtitle={subtitle} />
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedMembers.map((member) => (
          <li key={member.id}>
            <StaffCard member={member} />
          </li>
        ))}
      </ul>
    </section>
  );
}
