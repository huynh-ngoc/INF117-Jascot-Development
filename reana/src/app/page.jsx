import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { TierCards } from "@/components/tiers/card-tiers";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <TierCards />
    </div>
  );
}
