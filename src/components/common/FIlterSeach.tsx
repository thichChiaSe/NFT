import { Search } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { Field, Input, Label } from 'components/Field';

import { t } from 'i18next';
import { ListParams } from 'model/common';

export interface Props {
  filter?: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function Filter({ filter, onChange, onSearchChange }: Props) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter!,
      MTD: e.target.value,
    };
    onSearchChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Field>
            <Label>{t('Find')}</Label>
            <Input onChange={handleSearchChange} endAdornment={<Search />} inputRef={searchRef} />
          </Field>
        </Grid>
      </Grid>
    </Box>
  );
}
