
import { getUsers } from "@/server/users";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import DeleteUserButton from "./delete-user-button";
import UpdateUserButton from "./update-user-button";




export default async function UsersTable() {
    const users = await getUsers();
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (

        
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.createdAt?.toLocaleString() ?? "N/A"}</TableCell>
            <TableCell>
                <div className="flex items-center justify-end gap-2">
                    <UpdateUserButton user={user}/>
                    <DeleteUserButton userId={user.id}/>
                </div>
            </TableCell>
          </TableRow>
       ))}
      </TableBody>
    </Table>
  );
}
