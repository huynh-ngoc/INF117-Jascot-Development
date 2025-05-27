"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AccountForm from "./AccountForm";
import SubscriptionManager from "./SubscriptionManager";
import RoleSelector from "../role/RoleSelector";
import { Button } from "@/components/ui/button";

export default function ManageAccount() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({});
  const [subscriptionData, setSubscriptionData] = useState({});
  const [showDebug, setShowDebug] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFormValidityChange = (isValid) => {
    setIsFormValid(isValid);
  };

  const handleSubscriptionDataChange = useCallback((data) => {
    setSubscriptionData(data);
  }, []);

  const handleFormDataChange = useCallback((data) => {
    setFormData(data);
  }, []);

  const handleCreateClick = async () => {
    if (isFormValid && selectedRole !== null && selectedRole.id) {
      try {
        const response = await fetch("/api/account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountForm: formData,
            subscription: subscriptionData,
            selectedRole: selectedRole,
            timestamp: new Date().toISOString(),
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Account created successfully:", result);
          const userRole = result.data.role;
          if (userRole === "realtor") {
            router.push("/realtor-pop-up");
          } else if (userRole === "investor") {
            router.push("/userinvestmentstrategies");
          } else {
            router.push("/dashboard");
          }
        } else {
          console.error("Failed to create account:", result.error);
          alert(result.error);
        }
      } catch (error) {
        console.error("Error creating account:", error);
        alert("Failed to create account. Please try again.");
      }
    }
  };

  const getFormState = () => {
    return {
      accountForm: formData,
      subscription: subscriptionData,
      selectedRole: selectedRole,
      isFormValid: isFormValid,
      canSubmit: isFormValid && selectedRole !== null,
      timestamp: new Date().toISOString(),
    };
  };

  const handleDebugToggle = () => {
    setShowDebug(!showDebug);
  };

  const handleCopyToClipboard = () => {
    const state = getFormState();
    navigator.clipboard
      .writeText(JSON.stringify(state, null, 2))
      .then(() => alert("Form state copied to clipboard!"))
      .catch(() => alert("Failed to copy to clipboard"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Account Management</h1>

      <AccountForm
        onValidityChange={handleFormValidityChange}
        onDataChange={handleFormDataChange}
      />

      <SubscriptionManager onDataChange={handleSubscriptionDataChange} />

      <div>
        <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
        <RoleSelector
          onSelectRole={setSelectedRole}
          selectedRole={selectedRole}
        />
      </div>

      <div className="sticky bottom-6 flex justify-center mt-12">
        <Button
          size="lg"
          disabled={!isFormValid || selectedRole === null}
          onClick={handleCreateClick}
          className={`min-w-[300px] py-6 px-8 text-lg font-semibold
            transition-all duration-300
            ${
              isFormValid && selectedRole !== null
                ? "hover:-translate-y-1 opacity-100"
                : "opacity-60"
            }`}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
