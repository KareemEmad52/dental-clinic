import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from '@/lib/auth';

export const ProfileHeader = async () => {
  const session = await auth()
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-dental-100">
          <AvatarImage src={session?.user.image || "/placeholder.svg"} alt={session?.user.name || "User Name"} />
          <AvatarFallback>{session?.user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-semibold">Welcome, {session?.user.name || "User Name"}</h1>
          <p className="text-muted-foreground">Last appointment: March 15, 2025</p>
        </div>
      </div>
    </div>
  );
}