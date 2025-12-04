
'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser } from "@/server/users";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";
import { updateUser } from "@/server/users";




interface UserFormProps {
  user?: User;
  onFinished?: () => void;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function UserForm({ user, onFinished }: UserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const toastId = toast.loading(`User ${user ? "updating" : "adding"}...`);

    try {
      const userData = {
        ...values,
        password: "password123",
      };
      if (user) {
        await updateUser(user.id, userData);
      } else {
        await createUser(userData);
      }

      toast.success(`User ${user ? "updated" : "added"} successfully.`);
      form.reset();
      router.refresh();
      if (onFinished) {
        onFinished();
      }
    } catch (error) {
      toast.error(`Failed to ${user ? "update" : "add"} user.`);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Timani Gift" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="timanigift@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit">
          {
            isLoading ? <Loader2 className="size-4 animate-spin" /> : user ? "Update User" : "Add User"
          }
        </Button>
      </form>
    </Form>
  );
}




