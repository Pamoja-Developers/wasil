import { type FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  type BaseFieldProps,
} from "..";

export function AppTextField<T extends FieldValues>({
  name,
  type = "text",
  label,
  placeholder,
  control,
  LeadingIcon,
  Suffix,
}: BaseFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="w-full h-10 flex items-center gap-3 rounded-xl bg-slate-300/30 border border-slate-300 px-4 focus-within:border-[#182f81] focus-within:ring-1 focus-within:ring-[#182f81] transition">
              {LeadingIcon}
              <input
                {...field}
                type={type}
                placeholder={placeholder}
                className="w-full bg-transparent text-xs text-gray-800 placeholder:text-gray-400 outline-none"
              />
              {Suffix}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function AppTextAreaField<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  LeadingIcon,
  Suffix,
  rows = 1,
}: BaseFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="w-full flex items-start gap-3 rounded-xl bg-slate-300/30 border border-slate-300 px-4 py-3 focus-within:border-[#182f81] focus-within:ring-1 focus-within:ring-[#182f81] transition">
              {LeadingIcon}
              <textarea
                {...field}
                placeholder={placeholder}
                rows={rows}
                onInput={(e) => {
                  const textarea = e.currentTarget;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                  field.onChange(e);
                }}
                className="w-full resize-none overflow-hidden bg-transparent outline-none text-xs text-gray-800 placeholder:text-gray-400"
              />
              {Suffix}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
