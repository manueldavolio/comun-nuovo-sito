import { redirect } from "next/navigation";
import { merchandisingShopUrl } from "@/data/site";

export default function MerchandisingPage() {
  redirect(merchandisingShopUrl);
}
