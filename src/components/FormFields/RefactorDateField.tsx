import { ConstructionOutlined } from '@mui/icons-material';
import { FormControl, FormHelperText, InputLabel, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IDateFieldProps {
  name: any;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export default function RefactorDateField({ name, control, label, disabled }: IDateFieldProps) {
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
    >
      <DatePicker
        label={label}
        value={value ?? null}
        onChange={onChange}
        renderInput={(params: any) => <div defaultValue={value} {...params} />}
        //format="dd/MM/yyyy"
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
