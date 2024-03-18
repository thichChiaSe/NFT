import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { t } from 'i18next';

const PageBuilding = () => (
  <div
    className="not-found"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
  >
    <img
      src="https://www.blackboxdesign.com.au/wp-content/uploads/2022/03/Website-Maintenance-Perth-and-Melbourne-scaled.jpeg"
      alt="not-found"
      style={{ maxWidth: '86vw', minHeight: '100vh', mixBlendMode: 'darken' }}
    />
    <Link
      to="/home"
      className="link-home"
      style={{ textDecoration: 'none', position: 'absolute', bottom: '10px' }}
    >
      <Button variant="contained" startIcon={<HomeIcon />}>
        {t('Home')}
      </Button>
    </Link>
  </div>
);

export default PageBuilding;
