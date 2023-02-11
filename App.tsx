import * as React from 'react';
import { Button, FormGroup, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import './style.css';
import CountryAutocomplete from './components/country/CountryAutocomplete';
import TimeoutAutocomplete from './components/TimeoutAutocomplete';

const countries: { name: string; region: string }[] = [
  { name: 'Canada', region: 'North America' },
  { name: 'Japan', region: 'East Asia' },
  { name: 'Brazil', region: 'South America' },
];

const TIMEOUT_PRESETS = [-1, 900, 1800, 3600, 7200];

interface FormValues {
  country: typeof countries[number];
  timeout: number;
}

export default function App() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      country: null,
      timeout: 900,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormGroup onSubmit={onSubmit}>
      <Stack spacing={2}>
        {/* <CountryAutocomplete
          control={control}
          name={'country'}
          countries={countries}
        /> */}
        <TimeoutAutocomplete
          control={control}
          name={'timeout'}
          presets={TIMEOUT_PRESETS}
        />
        <Button type={'submit'} onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </FormGroup>
  );
}
