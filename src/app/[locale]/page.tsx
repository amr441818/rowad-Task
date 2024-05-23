import { useTranslations } from "next-intl";

import HomeProducts from "@/components/HomeProducts/HomeProducts";
export default function Home() {
  const t = useTranslations("Index");
  return (
    <>
      <HomeProducts />
    </>
  );
}
