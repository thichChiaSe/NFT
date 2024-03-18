import { TextField } from '@mui/material';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: any;
  control: Control<any>;
  label?: any;
  multiline?: boolean;
  rows?: number;
  className?: string;
  InputProps?: any;
  inputRef?:any;
  disabled?:any
  sx?:any
}

export function InputField({
  name,
  control,
  label,
  type,
  multiline,
  rows,
  className,
  InputProps,
  inputRef,
  disabled,
  sx,
  ...inputProps
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
      required={inputProps.required}
      fullWidth
      type={type}
      size='small'
      margin="dense"
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      variant="outlined"
      inputRef={inputRef}
      error={invalid}
      helperText={error?.message}
      InputProps={InputProps}
      className={className}
      multiline={multiline}
      rows={rows}
      sx={sx}
    />
  );
}
