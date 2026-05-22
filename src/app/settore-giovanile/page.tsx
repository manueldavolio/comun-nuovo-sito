import { redirect } from "next/navigation";

export const metadata = {
  title: "Settore Giovanile",
};

export default function SettoreGiovanilePage() {
  redirect("/attivita-di-base");
}
