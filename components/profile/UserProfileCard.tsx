"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  User, Calendar, FileText, Lock } from "lucide-react";
import UpdateDoctorForm from './UpdateDoctorForm';
import UpdatePasswordForm from './UpdatePassword';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';
import UpdatePatientForm from './updatePatient';
import { AppointmentTable } from './appoitment/appointmentTable';
import InvoicesTable from './invoice/InvoicesTable';


export const UserProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const session = useSession()

  
  
  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "pasword", label: "Password", icon: Lock },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "invoice", label: "Invoices", icon: FileText },
  ];

  return (
    <Card className="shadow-md ">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b overflow-hidden">
          <div className="overflow-x-auto p-2 md:p-4">
            <TabsList className="w-full flex-nowrap justify-start min-w-max">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 px-3 py-2 whitespace-nowrap"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="personal" className="m-0">
          {session.data?.user.role === Role.DOCTOR ? 
          
          <UpdateDoctorForm isEditing={isEditing} setIsEditing={setIsEditing} />
          : 
          <UpdatePatientForm isEditing={isEditing} setIsEditing={setIsEditing} />
          }
        </TabsContent>


        <TabsContent value="pasword" className="m-0">
          <UpdatePasswordForm />
        </TabsContent>
        
        <TabsContent value="appointments" className="m-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-6">Your Appointments</h2>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <AppointmentTable />
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="invoice" className="m-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-6">Your Invoices</h2>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
             <InvoicesTable />
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="billing" className="m-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-6">Billing Information</h2>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">No billing information available.</p>
              <Button className="mt-4 bg-dental-600 hover:bg-dental-700">
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};