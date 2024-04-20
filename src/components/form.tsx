"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { ButtonProps, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export type FormState = {
    type?: string;
    title?: string;
    description: string;
    redirect?: string;
};

export interface FormProps
    extends Omit<React.HTMLProps<HTMLFormElement>, "action"> {
    children: React.ReactNode;
    action?: (prevState: any, data: FormData) => Promise<FormState>;
    defaultValues?: Record<string, any>;
    buttonText?: string;
}

export const Form = ({ children, action, defaultValues, buttonText, ...props }: FormProps) => {
    const [state, formAction] = useFormState(action!, {
        title: "",
        description: "",
    });

    const router = useRouter();

    useEffect(() => {
        if (state.type || state.title) {
            toast({
                title: state.title,
                description: state.description,
                variant: state.type === "error" ? "destructive" : "default",
            });
        }

        if (state.redirect) {
            router.push(state.redirect);
        }
    }, [state, router]);

    return (
        <form action={formAction} {...props}>
            {children}
        </form>
    );
};

export const FormButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const status = useFormStatus();

        return (
            <button
                type="submit"
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
                disabled={status.pending}
            />
        );
    },
);

FormButton.displayName = "FormButton";
