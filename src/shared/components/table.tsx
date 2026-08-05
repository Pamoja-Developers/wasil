import type React from "react";
import { cn } from "../../utils/cn";
import type { AppError } from "../types/app.error";
import NotFound from "./not-found";

interface WrapperProps extends React.ComponentProps<"div"> {
  error?: AppError;
}

export function TableWrapper({
  error,
  className,
  children,
  ...props
}: WrapperProps) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "w-full overflow-hidden bg-white/80 rounded-lg p-3",
        className,
      )}
      {...props}
    >
      {error == null ? (
        children
      ) : (
        <NotFound
          isContent={true}
          title={error.title}
          message={error.message}
          Icon={error.Icon}
          Action={error.Action}
          className="flex-1"
        />
      )}
    </div>
  );
}
export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-auto w-full h-full">
      <table
        data-slot="table"
        className={cn(
          "min-w-full overflow-auto text-sm bg-slate-400/10 rounded-lg",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("w-full bg-slate-300/30 rounded-t-lg", className)}
      {...props}
    />
  );
}
export function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("w-full border-t font-medium", className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("w-full [&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-slate-400 whitespace-nowrap has-[[role=checkbox]]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "w-full hover:bg-slate-300/20 p-2 transition-colors duration-300 border-b border-b-slate-300/50",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  rowSpan,
  colSpan,
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "py-3 px-2 align-middle whitespace-nowrap text-black/80",
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="table-caption"
      className={cn("text-slate-400 text-sm", className)}
      {...props}
    />
  );
}

export function LoadingTableBody({ columns }: { columns: number }) {
  return Array.from({ length: 10 }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index}>
          <div className="w-full h-2 rounded-full bg-slate-200"></div>
        </TableCell>
      ))}
    </TableRow>
  ));
}
