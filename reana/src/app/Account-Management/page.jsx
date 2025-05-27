"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import ManageAccount from "@/components/account/ManageAccount";

export default function AccountManagementPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ManageAccount />
      </Suspense>
    </div>
  );
}
