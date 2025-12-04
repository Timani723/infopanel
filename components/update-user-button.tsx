
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import UserForm from "./forms/user-form";
import { User } from "@/db/schema";
import { useState } from "react";

interface UpdateUserButtonProps {
    user: User
}

export default function UpdateUserButton( { user }: UpdateUserButtonProps) {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Update the user details below.
          </DialogDescription>
        </DialogHeader>
        <UserForm user={user} onFinished={() => setOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
