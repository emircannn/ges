import React from "react";
import { redirect } from "next/navigation";
import { getProducts, checkUserPermissions } from "@/app/actions";
import { ProductsCMS } from "@/components/admin/ProductsCMS";
import { UnauthorizedView } from "@/components/admin/UnauthorizedView";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const user = await checkUserPermissions();
  if (!user) {
    redirect("/nivaart/login");
  }

  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !user.manageProducts) {
    return <UnauthorizedView sectionName="Ürün Yönetimi" />;
  }

  const products = await getProducts();
  return <ProductsCMS initialProducts={products as unknown as Parameters<typeof ProductsCMS>[0]["initialProducts"]} />;
}
