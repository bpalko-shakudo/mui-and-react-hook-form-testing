import * as React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import {Controller, type ControllerProps, type FieldValues, type FieldPath} from 'react-hook-form';

interface Props {
  countries: { name: string; region: string }[];
}

const CountryAutocomplete = function<TFieldValues extends FieldValues = FieldValues,TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,>({ countries, control, name }: Props & Omit<ControllerProps<TFieldValues, TName>, 'render'>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: 'Country is required',
      }}
      render={({ field, fieldState, formState }) => (
        <Autocomplete
          freeSolo
          onChange={(event, item) => field.onChange(item)}
          value={field.value}
          options={countries}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label={'Country'}
              error={fieldState.invalid}
              helperText={fieldState.invalid && fieldState.error?.message}
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <Typography>{option.name}</Typography>
            </li>
          )}
          getOptionLabel={(option) => option?.name || ''}
        />
      )}
    />
  );
};

export default CountryAutocomplete;