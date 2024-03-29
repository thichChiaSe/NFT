import { TextField } from '@mui/material';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: any;
  control: Control<any>;
  label?: any;
  InputProps?: any;
  inputProps?: any;
}

export function DisableField({
  name,
  control,
  label,
  type,
  InputProps,
  inputProps,
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      // disabled
      type={type}
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      variant="outlined"
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
      InputProps={InputProps}
    ></TextField>
  );
}
