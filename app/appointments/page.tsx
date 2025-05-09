import { BookAppointmentsForm } from "@/components/BookAppointments/BookAppointmentsForm"
import BookAppointmentHeader from "@/components/BookAppointments/BookAppointmentsHeaders"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Appointments",
    description: "Appointments Page",
}

export default function Appointments() {
    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-center">
                <Card className="w-full md:w-2/3 shadow-lg my-5 ">
                    <CardHeader>
                        <BookAppointmentHeader />
                    </CardHeader>
                    <CardContent>
                        <BookAppointmentsForm />
                    </CardContent>
                </Card>

            </div>
        </>
    )
}
