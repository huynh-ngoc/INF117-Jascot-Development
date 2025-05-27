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

  const handleCreateClick = () => {
    if (isFormValid && selectedRole !== null && selectedRole.id) {
      console.log("Final form data being sent:", {
        accountForm: formData,
        subscription: subscriptionData,
        selectedRole: selectedRole, // This will be { id: "property_investor", title: "Property Investor", description: "..." }
        timestamp: new Date().toISOString(),
      });
      router.push("/dashboard");
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

      {/* Debug Panel */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleDebugToggle}>
            {showDebug ? "Hide Debug" : "Show Debug"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
            Copy State
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Current form state:", getFormState())}
          >
            Log to Console
          </Button>
        </div>

        {showDebug && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                Current Form State:
              </h3>
              <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-64">
                {JSON.stringify(getFormState(), null, 2)}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Form Valid:</span>
                <span
                  className={isFormValid ? "text-green-600" : "text-red-600"}
                >
                  {isFormValid ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Role Selected:</span>
                <span
                  className={selectedRole ? "text-green-600" : "text-red-600"}
                >
                  {selectedRole ? selectedRole.title : "None"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Can Submit:</span>
                <span
                  className={
                    isFormValid && selectedRole
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {isFormValid && selectedRole ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Form Fields:</span>
                <span className="text-blue-600">
                  {Object.keys(formData).length} fields
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

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
