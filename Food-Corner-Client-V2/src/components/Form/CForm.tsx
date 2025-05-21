/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { ReactNode } from "react";

interface MyFormProps {
  onFormSubmit: (data: FieldValues) => Promise<void>;
  children: ReactNode;
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}
type TFormConfig = {
  defaultValues: Record<string, unknown>;
  resolver: any;
};
const CForm = ({
  children,
  defaultValues,
  resolver,
  onFormSubmit,
}: MyFormProps) => {
  const formConfig: TFormConfig = {
    defaultValues: {},
    resolver: undefined,
  };

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm<FieldValues>(formConfig);

  const submit = async (data: FieldValues) => {
    await onFormSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CForm;
