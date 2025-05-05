import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { UserProfileCard } from "@/components/profile/UserProfileCard"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Dentaire - Dentist & Dental Clinic",
  description: "Profile",
}

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ProfileHeader />

      <div className="mt-8">
        <UserProfileCard />
      </div>
    </div>
  )
}

export default page