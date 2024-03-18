import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IDateFieldProps {
  name: any;
  control: Control<any>;
  label?: any;
  disabled?: boolean;
  disableds?: boolean;
  required?: boolean;
  className?: any;
}

export default function DateFieldNoLimit({
  name,
  control,
  label,
  disabled,
  disableds,
  required,
  className,
}: IDateFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  // Lấy ngày hiện tại
//   const currentDate = new Date();

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      sx={{ marginTop: '8px' }}
      disabled={disabled}
      error={invalid}
      className={className}
    >
      <DatePicker
        // maxDate={currentDate}
        disabled={disableds}
        label={label}
        value={value ?? null}
        onChange={onChange}
        inputFormat="dd-MM-yyyy"
        renderInput={(params) => (
          <TextField
            defaultValue="01-01-2000"
            sx={{
              '.MuiInputBase-input': {
                paddingTop: '0px',
                marginTop: '10px',
                paddingBottom: '10px',
              },
            }}
            // error={invalid}
            {...params}
          />
        )}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
