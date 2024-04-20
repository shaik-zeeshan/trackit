import { BackButton } from "@/components/back-button";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen space-y-10 md:p-12 sm:p-8 p-5">
      <div>
        <BackButton />
      </div>
      {children}
    </div>
  );
}
