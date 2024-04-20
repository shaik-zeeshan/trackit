import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Components } from "react-markdown";
import { CodeBlock } from "../code-block";

export interface TypographyElementProps {
  children?: React.ReactNode;
  node?: any;
}

export function TypographyH1({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-3",
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight")}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight")}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("scroll-m-20 text-lg font-semibold tracking-tight")}
      {...props}
    >
      {children}
    </h5>
  );
}

export function TypographyH6({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={cn("scroll-m-20 text-base font-semibold tracking-tight")}
      {...props}
    >
      {children}
    </h6>
  );
}

export function TypographyP({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBlockquote({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic")} {...props}>
      {children}
    </blockquote>
  );
}

export function TypographyTable({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLTableElement>) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto")}>
      <table className={cn("w-full", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TypographyTh({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "py-2 px-4 text-left font-semibold border-b border-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TypographyTd({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("py-2 px-4 border-b border-gray-300", className)}
      {...props}
    >
      {children}
    </td>
  );
}

export function TypographyList({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}

export function TypographyListItem({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  );
}

export function TypographyCode({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "z-10 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

// export function TypographyPre({
//   className,
//   children,
// node: _,
//   ...props
// }: TypographyElementProps & HTMLAttributes<HTMLElement>) {
//   return (
//     <pre
//       className={cn("p-4 bg-gray-100 rounded-md relative", className)}
//       {...props}
//     >
//       {children}
//       <button
//         className="absolute top-2 right-2 z-50"
//         onClick={() => {
//           // @ts-ignore
//           if (children?.props?.children) {
//             // @ts-ignore
//             navigator.clipboard.writeText(children?.props?.children);
//           }

//           toast({
//             title: "Copied to clipboard",
//           });
//         }}
//       >
//         <Copy className="h-5 w-5" />
//       </button>
//     </pre>
//   );
// }

export function TypographyLead({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl text-muted-foreground")} {...props}>
      {children}
    </p>
  );
}

export function TypographyLarge({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="text-lg font-semibold" {...props}>
      {children}
    </div>
  );
}

export function TypographySmall({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLElement>) {
  return (
    <small className="text-sm font-medium leading-none" {...props}>
      {children}
    </small>
  );
}

export function TypographyMuted({
  children,
  node: _,
}: TypographyElementProps & HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function TypographyLink({
  className,
  children,
  node: _,
  ...props
}: TypographyElementProps & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(className, "font-mono")} {...props}>
      {children}
    </a>
  );
}

export const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  H5: TypographyH5,
  H6: TypographyH6,
  P: TypographyP,
  Blockquote: TypographyBlockquote,
  Table: TypographyTable,
  Th: TypographyTh,
  Td: TypographyTd,
  List: TypographyList,
  ListItem: TypographyListItem,
  Code: TypographyCode,
  Pre: CodeBlock,
  Lead: TypographyLead,
  Large: TypographyLarge,
  Small: TypographySmall,
  Muted: TypographyMuted,
  Link: TypographyLink,
};

export const typographConfig: Partial<Components> = {
  h1: Typography.H1,
  h2: Typography.H2,
  h3: Typography.H3,
  h4: Typography.H4,
  h5: Typography.H5,
  h6: Typography.H6,
  p: Typography.P,
  blockquote: Typography.Blockquote,
  table: Typography.Table,
  th: Typography.Th,
  td: Typography.Td,
  ul: Typography.List,
  li: Typography.ListItem,
  code: Typography.Code,
  pre: Typography.Pre,
  small: Typography.Small,
  a: Typography.Link,
};
