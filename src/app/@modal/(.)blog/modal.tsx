"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  url: string;
}

export function Modal({ children, url }: ModalProps) {
  const router = useRouter();

  const pathname = usePathname();

  return (
    <Dialog
      defaultOpen
      open={pathname === url}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

// export const ModalPageWrapper = ({
//   children,
//   ...props
// }: {
//   children: React.ReactNode;
// } & MotionProps &
//   HTMLAttributes<HTMLDivElement>) => {
//   const pathname = usePathname();

//   return (
//     <motion.div layoutId={pathname} {...props}>
//       {children}
//     </motion.div>
//   );
// };
