import { ChangeEvent, useEffect, useMemo, useState } from "react";

export interface FormValidation {
  [key: string]: [(value: any) => boolean, string];
}

interface FormCheckValues {
  [key: string]: string | null;
}

interface FormState {
  [key: string]: string;
}
export const useForm = <T extends {}, Y = any>(
  initialForm: T = {} as T,
  formValidations?: FormValidation
) => {
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [formValidation, setFormValidation] = useState<FormCheckValues>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: FormCheckValues = {};
    if (!formValidations) return;

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...(formState as T),
    formState,
    onInputChange,
    onResetForm,

    ...(formValidation as Y),
    isFormValid,
  };
};
