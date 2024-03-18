import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
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
  readOnly?: any;
  style?: any;
}

export default function DateField({
  name,
  control,
  label,
  disabled,
  disableds,
  required,
  className,
  readOnly,
  style,
}: IDateFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  // Lấy ngày hiện tại
  const currentDate = new Date();
  const [currentDatez, setCurrentDatez] = React.useState(currentDate);
  const formatCurrentDate = moment(currentDatez).format('DD/MM/YYYY');
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      sx={{ marginTop: '8px', backgroundColor: '#fff', backgroundClip: 'content-box, padding-box' }}
      disabled={disabled}
      error={invalid}
      className={className}
      style={style}
    >
      <DatePicker
        maxDate={currentDate}
        disabled={disableds}
        readOnly={readOnly}
        label={label}
        value={value ?? null}
        onChange={onChange}
        inputFormat="dd-MM-yyyy"
        renderInput={(params) => (
          <TextField
            defaultValue={formatCurrentDate}
            // defaultValue="01-01-2000"
            InputProps={{ readOnly: true }}
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
