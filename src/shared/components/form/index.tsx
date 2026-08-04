import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type Control,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export const AppFormProvider = FormProvider;

export interface BaseFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  control?: Control<T, any, T>;
  type?: "text" | "email" | "password" | "url" | "tel" | "number";
  className?: string;
  LeadingIcon?: React.ReactNode;
  Suffix?: React.ReactNode;
  rows?: number;
}
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

interface FormControlProps {
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const FormItemContext = React.createContext<{
  id: string;
}>({} as any);

export function FormItem({ children }: React.PropsWithChildren) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className="space-y-2 flex flex-col">{children}</div>
    </FormItemContext.Provider>
  );
}

export function useFormField() {
  const field = React.useContext(FormFieldContext);
  const item = React.useContext(FormItemContext);

  const { getFieldState } = useFormContext();

  const formState = useFormState({
    name: field.name,
  });

  const fieldState = getFieldState(field.name, formState);

  return {
    id: item.id,
    name: field.name,

    inputId: `${item.id}-input`,
    messageId: `${item.id}-message`,

    ...fieldState,
  };
}

export function FormLabel({ children }: React.PropsWithChildren) {
  const { inputId } = useFormField();

  return (
    <label htmlFor={inputId} className="text-xs">
      {children}
    </label>
  );
}

export function FormControl({ children }: FormControlProps) {
  const { inputId } = useFormField();

  return React.cloneElement(children, {
    id: inputId,
  });
}

export function FormMessage() {
  const { error, messageId } = useFormField();

  if (!error) return null;

  return (
    <p id={messageId} className="text-xs text-red-500">
      {error.message}
    </p>
  );
}
