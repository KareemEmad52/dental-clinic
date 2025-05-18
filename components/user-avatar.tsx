import { Calendar, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { handleLogout } from "@/utils/actions/Auth-actions";
import Link from "next/link";
import Image from "next/image";

export async function UserAvatar() {
  const session = await auth();


  const isDoctor = session?.user.role === "DOCTOR";
  const isPatient = session?.user.role === "PATIENT";



  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            src={session?.user.image || "/placeholder.svg"}
            alt={session?.user.name || "User Name"}
          />
          <AvatarFallback>
            {session?.user.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          {isDoctor && (
            <Link href="/doctor/appointments">
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Appointments</span>
              </DropdownMenuItem>
            </Link>
          )}

           {isPatient && (
            <Link href="/patient/appointments">
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>My Appointments</span>
              </DropdownMenuItem>
            </Link>
          )}

          {isPatient && (
            <Link href="/invoice">
              <DropdownMenuItem>
                <Image src="/invoice.svg" width={16} height={16} alt="star Icon" className="mr-2 h-4 w-4" />
                <span>My Invoices</span>
              </DropdownMenuItem>
            </Link>
          )}


         
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <form action={handleLogout}>
          <button type="submit" className="w-full text-left">
            <DropdownMenuItem asChild>
              <div className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </div>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
