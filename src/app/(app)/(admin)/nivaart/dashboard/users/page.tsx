import React from "react";
import { getUsers } from "@/app/actions";
import { UsersCMS } from "@/components/admin/UsersCMS";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const usersList = await getUsers();

  return (
    <div className="w-full">
      <UsersCMS initialUsers={usersList} />
    </div>
  );
}
