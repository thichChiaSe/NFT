import { Grid, Button, IconButton, Paper, InputBase, Divider, Popover } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxField from 'components/FormFields/CheckboxField';
import { InputFieldOfHoang } from 'components/FormFields/InputFieldOfHoang';
import { t } from 'i18next';

export interface DrugFiltersProps {
  filter: any;
  onChange?: (newFilter: any) => void;
  onSearchChange?: (newFilter: any) => void;
}

export default function FiltersOfHoang({ filter, onChange: onChangeProp, onSearchChange }: any) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const searchRef = useRef<HTMLInputElement>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchName, setSearchName] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('filter filterÒHoang', filter);
  const handleSearchChange = (searchParams: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: any = {
      ...filter,
      ...searchParams,
      FullName: searchName,
      pageIndex: 0,
    };
    onSearchChange(newFilter);
  };
  const handleResetFilter = () => {
    setSearchName('');
    reset({ FullName: '', MTD: '', });
    const newFilter = {
      pageIndex: 0,
      pageSize: 10,
    };
    onSearchChange(newFilter);
  };
  useEffect(() => {
    const newFilter: any = {
      ...filter,
      FullName: searchName,
      pageIndex: 0,
    };
    onSearchChange(newFilter);
  }, [searchName]);

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 580 }}
      >
        <div
          style={{
            marginTop: '10px',
            marginLeft: '20px',
          }}
        >
          <SearchIcon />
        </div>
        <InputBase
          value={searchName}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm kiếm"
          inputProps={{ 'aria-label': 'Tìm kiếm' }}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: '10px' }}
          aria-label="directions"
          onClick={handleClick}
        >
          <ManageSearchIcon />
        </IconButton>
      </Paper>
      <Popover
        id={'id'}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <form onSubmit={handleSubmit((d: any) => handleSearchChange(d))}>
          <div
            style={{
              width: '545px',
              margin: '15px',
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  {t('FullName')}
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="FullName"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  MDT
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="MTD"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  {t('Phone')}
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="Phone"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  {t('Birthday')}
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="Birthday"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '15px',
                  }}
                >
                  Mã PrEP:
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="searchPrEPCode"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  BHYT:
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="bhyt"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  CCCD:
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="cccd"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  CMND:
                </div>
              </Grid>
              <Grid item xs={9}>
                <InputFieldOfHoang
                  name="cmnd"
                  control={control}
                  id="standard-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    marginTop: '25px',
                  }}
                >
                  Nghi trùng:
                </div>
              </Grid>
              <Grid item xs={9}>
                <CheckboxField name="isSuspecting" control={control} />
              </Grid> */}
              <Grid item xs={12}>
                <div
                  style={{
                    paddingTop: '5px',
                  }}
                ></div>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="outlined" color="error" onClick={handleResetFilter}>
                    Đặt lại
                  </Button>
                  <Button variant="contained" type="submit">
                    Tìm kiếm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </form>
      </Popover>
    </>
  );
}
