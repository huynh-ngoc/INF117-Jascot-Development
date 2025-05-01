"use client";
import RealtorProfileForm from "@/components/forms/RealtorProfileForm";
import { useState } from "react";

export default function RealtorPopup() {

      const [profile, setProfile] = useState({
        brokerage_name: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        office_number: "",
        office_number_ext: "",
        agent_name: "",
        license_number: "",
        email: "",
        cellphone: "",
        type_of_agent: "",
      });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
      };
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Realtor Popup</h1>
      <p className="text-lg mb-4">This is the Realtor Popup page.</p>
      <RealtorProfileForm profile={profile} onProfileChange={handleProfileChange}></RealtorProfileForm>
    </div>
  );
}