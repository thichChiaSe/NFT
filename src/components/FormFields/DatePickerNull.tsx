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
  maxDate?: any;
  className?: any;
  minDate?: any;
  value?: any;
}

export default function DatePickerNull({
  name,
  control,
  label,
  disabled,
  maxDate,
  minDate,
  disableds,
  required,
  value,
  className,
}: IDateFieldProps) {
  const {
    field: { onChange, onBlur },
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
      sx={{ marginTop: '8px' }}
      disabled={disabled}
      error={invalid}
      className={className}
    >
      <DatePicker
        maxDate="2023-12-31"
        minDate={minDate}
        disabled={disableds}
        label={label}
        value={value}
        onChange={onChange}
        inputFormat="dd-MM-yyyy"
        open={false} // Tắt việc hiển thị ngày tháng khi mở ra
        renderInput={(params) => (
          <TextField
            sx={{
              '.MuiInputBase-input': {
                paddingTop: '0px',
                marginTop: '10px',
                paddingBottom: '10px',
              },
            }}
            error={invalid}
            {...params}
          />
        )}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
