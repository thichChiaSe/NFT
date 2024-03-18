import { Toolbar, alpha } from '@mui/material';
import { locales } from 'i18n/i18n';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { AccountDrawer } from './AccountDrawer';

export const Header = () => {
  const [toggleLanguage, setToggleLanguage] = useState<string>('none');
  const [languageCode, setLanguageCode] = useState<string>('vn');

  const useStyles = makeStyles({
    dropdown: {
      position: 'relative',
      display: 'inline-block',
      '&:hover': {
        '&& .dropdownContent': {
          display: 'block',
        },
      },
    },
    dropdownContent: {
      display: 'none',
      position: 'absolute',
      backgroundColor: '#3C8DBC',
      minWidth: '110px',
      boxShadow: ' 0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1,
      borderRadius: '25px',
      marginTop: '1px',
    },
    text: {
      cursor: 'pointer',
      listStyleType: 'none',
      display: 'block',
      padding: ' 12px 16px',
      '&:hover ': {
        backgroundColor: '#000',
        borderRadius: '25px',
      },
    },
  });
  const { t, i18n } = useTranslation();
  const changleLanguageHandlerVi = (lang: any) => {
    i18n.changeLanguage('en');
    setLanguageCode('en');
  };
  const changleLanguageHandlerEn = (lang: any) => {
    i18n.changeLanguage('vn');
    setLanguageCode('vn');
  };
  const currentLanguage = locales[i18n.language as keyof typeof locales];

  const changleLanguage = (lng: 'vn' | 'en') => {
    i18n.changeLanguage(lng);
    setLanguageCode(lng);
  };
  const classes = useStyles();
  return (
    <>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* change language  */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.dropdown}>
            <button
              onClick={() => setToggleLanguage(toggleLanguage === 'none' ? 'block' : 'none')}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '20px',
                border: '0.5px solid black',
                background: '#fff',
              }}
            >
              <LanguageIcon />
              {currentLanguage}
            </button>
            <div className={`${classes.dropdownContent} dropdownContent`}>
              {languageCode === 'vn' && (
                <li onClick={changleLanguageHandlerVi} className={classes.text}>
                  {t('English')}
                </li>
              )}
              {languageCode === 'en' && (
                <li onClick={changleLanguageHandlerEn} className={classes.text}>
                  {t('Vietnamese')}
                </li>
              )}
            </div>
          </div>
          <AccountDrawer />
        </div>
      </Toolbar>
    </>
  );
};
