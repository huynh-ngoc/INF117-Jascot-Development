"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Building2, User, Wallet, Wrench } from "lucide-react";

const userRoles = [
  {
    id: "property_investor",
    title: "Property Investor",
    icon: Building2,
    description: "For real estate investors and property buyers",
  },
  {
    id: "realtor",
    title: "Realtor",
    icon: User,
    description: "For real estate agents and brokers",
  },
  {
    id: "lender",
    title: "Lender",
    icon: Wallet,
    description: "For mortgage lenders and financial institutions",
  },
  {
    id: "service_provider",
    title: "Service Provider",
    icon: Wrench,
    description: "For contractors and service providers",
  },
];

export default function RoleSelector({ onSelectRole, selectedRole }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRoleClick = (role) => {
    onSelectRole({
      id: role.id,
      title: role.title,
      description: role.description,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {userRoles.map((role, index) => {
        const Icon = role.icon;
        const isSelected = selectedRole && selectedRole.id === role.id;

        return (
          <Card
            key={role.id}
            className={`relative aspect-square max-w-[200px] w-full mx-auto flex flex-col items-center justify-center cursor-pointer p-4
              ${
                isSelected
                  ? "border-2 border-primary bg-primary/5"
                  : "border-2 border-transparent bg-card"
              }
              hover:border-primary hover:transform hover:-translate-y-1 transition-all duration-300`}
            onClick={() => handleRoleClick(role)}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300
              ${isSelected ? "bg-primary/10" : "bg-muted"}
              group-hover:bg-primary/10`}
            >
              <Icon
                className={`w-7 h-7 transition-colors duration-300
                ${isSelected ? "text-primary" : "text-muted-foreground"}
                group-hover:text-primary`}
              />
            </div>
            <h3
              className={`text-base font-semibold text-center mb-1 transition-colors duration-300
              ${isSelected ? "text-primary" : "text-foreground"}
              group-hover:text-primary`}
            >
              {role.title}
            </h3>
            <p className="text-xs text-muted-foreground text-center leading-tight">
              {role.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
