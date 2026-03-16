import { getAllUsers } from "@/actions/users";
import AllUsersClient from "@/components/modules/admin/AllUsersClient";
import { Users } from "lucide-react";

export default async function AllUsersPage() {
  const { data: response } = await getAllUsers();
  const users = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">All Users</h1>
          <p className="text-muted-foreground">
            Manage and monitor all registered users
          </p>
        </div>
      </div>

      <AllUsersClient users={users} />
    </div>
  );
}
