"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Button variant="ghost" onClick={handleClick} className="gap-5">
      <ArrowLeft className="w-6 h-6" />
      Back
    </Button>
  );
};
