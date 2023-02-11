import * as React from 'react';
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import { Controller,  type ControllerProps, type FieldValues, type FieldPath } from "react-hook-form";
import default as dayjs from 'dayjs'
import { IconButton, Typography, Tooltip } from '@mui/material';
import * as RotateLeftIcon from '@mui/icons-material/RotateLeft';

const getLabel = function(timeout: number) {
				if (Number(timeout) === -1) return 'Never';
				const readable = dayjs.duration(timeout, 'seconds');
				let content = [];
				if (readable.years() > 0) content.push(readable.years() + ' yr');
				if (readable.months() > 0) content.push(readable.months() + ' mon');
				if (readable.days() > 0) content.push(readable.days() + ' day');
				if (readable.hours() > 0) content.push(readable.hours() + ' hr');
				if (readable.minutes() > 0) content.push(readable.minutes() + ' min');
				if (readable.seconds() > 0) content.push(readable.seconds() + ' sec');
				return content.join(' ');
}

interface Props {
  presets: number[];
}

const TimeoutAutocomplete = function<TFieldValues extends FieldValues = FieldValues,TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,>({control, name, presets, defaultValue, rules, shouldUnregister}: Props & Omit<ControllerProps<TFieldValues, TName>, 'render'>) {

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: (value) => {
          const val = Number(value);
          if (isNaN(val)) {
            return 'Value must be a number'
          }
          return val === -1 || val > 0 || 'Value must be positive or -1'
        }
      }}
      shouldUnregister={shouldUnregister}
      render={({field, fieldState,}) => (
        <Autocomplete
          freeSolo
          onChange={(event, item) => field.onChange(item)}
          value={field.value}
          options={presets}
          renderInput={(params) => (
            <TextField 
            {...params}
            onChange={(event) => field.onChange(event)}
            error={fieldState.invalid}
            label={getLabel(field.value) || 'Timeout'}
            helperText={fieldState.invalid && fieldState.error?.message} 
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Tooltip title='Reset'>
                  <IconButton
                    onClick={() => setValue('timeout', String(TIMEOUT_DEFAULT))}
                    size='small'>
                    <RotateLeftIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ),
            }}
            />
          )}
          getOptionLabel={(option) => String(option)}
          renderOption={(props, option) => (
            <li {...props}>
              <Typography>{getLabel(option as number)}</Typography>
            </li>
          )}
        />
      )}
    />
  )
}

export default TimeoutAutocomplete;