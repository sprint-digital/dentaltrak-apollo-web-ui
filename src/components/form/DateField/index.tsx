import React, { ReactElement } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { DateInput, DateInputProps } from '~/components/form/DateInput';
import { Field, FieldProps } from '~/components/form/Field';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedDateInputProps = Pick<DateInputProps, 'placeholder' | 'inputSize' | 'disabledDate'>;
type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

export interface DateProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Date | null>,
> extends AllowedDateInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Date | null>,
>(
  props: DateProps<TFormValues, TName>,
): ReactElement => {
  const { name, control, label, className, required, placeholder, inputSize, disabledDate } =
    useCombinedPropsWithKit({
      name: 'DateField',
      props,
    });

  const controller = useController({ name, control });
  const value = controller.field.value as Date | null;
  const onChange = controller.field.onChange as (value: Date | null) => void;

  return (
    <Field
      className={className}
      error={controller.fieldState.error}
      label={label}
      required={required}
    >
      <DateInput
        disabledDate={disabledDate}
        error={!!controller.fieldState.error}
        inputSize={inputSize}
        placeholder={placeholder ?? label}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
};
