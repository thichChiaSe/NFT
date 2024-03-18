import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value?: number | string;
}

export interface SelectOptionMedic {
  price: number;
  usesMed?: string;
  label?: string;
  value?: number | string;
}

export interface SelectFieldProps {
  required?: boolean;
  name: any;
  defaultVL: any;
  control?: Control<any>;
  label?: string;
  fieldId?: string;
  disabled?: boolean;
  options: SelectOption[];
  style?: any;
}

export function SelectField({
  name,
  control,
  label,
  fieldId,
  disabled,
  required,
  options,
  defaultVL,
  style,
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
      style={style}
      required={required}
    >
      <InputLabel id={`${fieldId ?? name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${fieldId ?? name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        required={required}
        defaultValue={defaultVL}
        style={{ height: '43px' }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
