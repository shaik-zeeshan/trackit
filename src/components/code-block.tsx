"use client";

import { Copy } from "lucide-react";
import React, { HTMLAttributes } from "react";
import { useToast } from "./ui/use-toast";
import { TypographyElementProps } from "./ui/typography";
import { cn } from "@/lib/utils";

export const CodeBlock = ({
  className,
  children,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLPreElement>) => {
  const { toast } = useToast();
  return (
    <div className="relative my-4 overflow-hidden">
      <pre
        className={cn("p-4 z-10 bg-muted rounded-md overflow-auto", className)}
        {...props}
      >
        {children}
        <button
          className="absolute top-2 right-2 z-50"
          onClick={() => {
            // @ts-ignore
            if (children?.props?.children) {
              // @ts-ignore
              navigator.clipboard.writeText(children?.props?.children);
            }

            toast({
              title: "Copied to clipboard",
            });
          }}
        >
          <Copy className="h-5 w-5" />
        </button>
      </pre>
    </div>
  );
};
