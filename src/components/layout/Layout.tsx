import {
  AppBar,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useHistory, useLocation } from 'react-router-dom';
import { BookSharp, ManageHistoryOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Header } from 'components/common/Header';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import ScrollToTop from 'react-scroll-to-top';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { selectRoles } from 'features/auth/authSlice';
import { Roles } from 'features/auth/models';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { ADMIN, BAC_SI, DONG_DAU, NHAP_LIEU, QUAN_LY, THU_NGAN, TIEM_CHUNG, TIEP_NHAN } from 'utils/helper';

const drawerWith = 240;
const useStyle = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
    },
    page: {
      // backgroundColor: '#efedee',
      width: '100%',
      overflowX: 'hidden',
      //   margin: 10,
    },
    drawer: {
      width: drawerWith,
      background: '#0B97C4!important',
    },
    drawerPaper: {
      width: drawerWith,
      background: '#0B97C4!important',
    },
    drawerHeader: {
      color: '#FFFFFF',
    },

    iconDrawer: {
      color: '#FFFFFF',
    },
    iconActive: {
      color: '#080808',
    },
    headerActive: {
      color: '#080808',
      fontWeight: '400',
    },
    noPrint: {
      display: 'none',
    },
    active: {
      background: '#f4f4f4',
      color: '#000',
    },
    activeText: {
      color: '#080808',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 20,
    },
    appBar: {
      width: `calc(100% - ${drawerWith}px)`,
      marginLeft: drawerWith,
      backgroundColor: '#fff!important',
      height: 70,
    },
    // toolbar: theme.mixins.toolbar,
    header: {
      flexGrow: 1,
    },
    language: {
      marginLeft: 20,
    },
  };
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // Dispatch action INIT_APP để khởi tạo ứng dụng
  useEffect(() => {
    dispatch({ type: 'INIT_APP' });
  }, [dispatch]);
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(true);
  const [activePath, setActivePath] = useState<string>(location.pathname);
  const roles = useAppSelector(selectRoles) as Roles | undefined;
  const name = roles?.data?.pagingData;

  const memnuItem = [
    // {
    //   text: 'Dashboard',
    //   icon: <DashboardCustomizeTwoTone />,
    //   path: '/',
    // },
    // {
    //   text: 'Trung Tâm',
    //   icon: <LocationCity />,
    //   path: '/center',
    // },
    // {
    //   text: 'Vaccine',
    //   icon: <Vaccines />,
    //   path: '/vacine',
    // },
    {
      text: `${t('Immunization Book')}`,
      icon: <BookSharp />,
      path: '/vacine-record',
    },
    {
      text: `${t('Registration Form')}`,
      icon: <ContentPasteOutlinedIcon />,
      path: '/registration-form',
    },
    // {
    //   text: `${t('Vaccination voucher')}`,
    //   icon: <ContentPasteOutlinedIcon />,
    //   path: '/vacine-card',
    //   subRouter: [
    //     {
    //       text: `${t('Management')}`,
    //       icon: <ManageHistoryOutlined />,
    //       path: '/vacine-card/manage',
    //     },
    //   ],
    // },
    {
      text: `${t('Manage confirmation tickets')}`,
      icon: <ManageHistoryOutlined />,
      path: '/vacineCards/manage',
    },
    {
      text: `${t('Manage reception')}`,
      icon: <BeenhereIcon />,
      path: '/reception/manage',
    },
    {
      text: `${t('Vaccinate')}`,
      icon: <BeenhereIcon />,
      path: '/vaccinate/manage',
    },
    // {
    //   text: 'Người Dùng',
    //   icon: <ManageHistoryOutlined />,
    //   path: '/user',
    // },
  ];

  // const filteredMenuItem = name?.find((e) => e.name === 'Records Management')
  //   ? memnuItem.filter(
  //       (item) =>
  //         item.text !== `${t('Vaccination voucher')}` ||
  //         item.text !== `${t('Manage confirmation tickets')}`
  //     )
  //   : memnuItem;

  // const filteredMenuItem = name?.find((e) => e.name === 'Cashier')
  //   ? memnuItem.map((item) => {
  //       if (item.text === `${t('Registration Form')}`) {
  //         item.text = `${t('Hóa Đơn')}`;
  //         item.icon = <RequestQuoteIcon />;
  //       }
  //       return item;
  //     })
  //   : name?.find((e) => e.name === 'Signer')
  //   ? memnuItem.filter((item) => item.text !== `${t('Registration Form')}`)
  //   : memnuItem;

  // filteredMenuItem.forEach((item) => {
  //   if (item.text === `${t('Registration Form')}`) {
  //     item.text = `${t('Bill')}`;
  //   }
  // });

  let filteredMenuItem = memnuItem;

  if (name?.find((e) => e.name === ADMIN || e.name === QUAN_LY)) {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },
      {
        text: `${t('Manage reception')}`,
        icon: <BeenhereIcon />,
        path: '/reception/manage',
      },

      {
        text: `${t('Indications')}`,
        icon: <ContentPasteOutlinedIcon />,
        path: '/registration-form',
      },
      {
        text: `${t('Payment')}`,
        icon: <RequestQuoteIcon />,
        path: '/payment/manage',
      },
      {
        text: `${t('Vaccinate')}`,
        icon: <VaccinesIcon />,
        path: '/vaccinate/manage',
      },

      // {
      //   text: `${t('Nhập liệu')}`,
      //   icon: <PostAddSharpIcon />,
      //   path: '/dataEntry/manage',
      // },
    
      {
        text: `${t('Confirm')}`,
        icon: <ManageHistoryOutlined />,
        path: '/vacineCards/manage',
      },
      // {
      //   text: `${t('Bill')}`,
      //   icon: <RequestQuoteIcon />,
      //   path: '/registration-form',
      // },
      {
        text: `${t('Reporting statistics')}`,
        icon: <AssessmentIcon />,
        path: '/reportingStatistics',
      },
      {
        text: `${t('Price list management')}`,
        icon: <PriceChangeIcon />,
        path: '/price-list-management',
      },
    ];
  } else if (name?.find((e) => e.name === TIEP_NHAN)) {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },
      {
        text: `${t('Manage reception')}`,
        icon: <BeenhereIcon />,
        path: '/reception/manage',
      },
    ];
  } else if (name?.find((e) => e.name === THU_NGAN)) {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },
      {
        text: `${t('Payment')}`,
        icon: <RequestQuoteIcon />,
        path: '/payment/manage',
      },
      {
        text: `${t('Reporting statistics')}`,
        icon: <AssessmentIcon />,
        path: '/reportingStatistics',
      },
      {
        text: `${t('Price list management')}`,
        icon: <PriceChangeIcon />,
        path: '/price-list-management',
      },
    ];
  } else if (name?.find((e) => e.name === BAC_SI)) {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },
      {
        text: `${t('Indications')}`,
        icon: <ContentPasteOutlinedIcon />,
        path: '/registration-form',
      },
      {
        text: `${t('Confirm')}`,
        icon: <ManageHistoryOutlined />,
        path: '/vacineCards/manage',
      },
    ];
  } else if (name?.find((e) => e.name === NHAP_LIEU || e.name === DONG_DAU)) {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },

      {
        text: `${t('Confirm')}`,
        icon: <ManageHistoryOutlined />,
        path: '/vacineCards/manage',
      },
    ];
  } else if (name?.find((e) => e.name === TIEM_CHUNG)) {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },
      {
        text: `${t('Vaccinate')}`,
        icon: <VaccinesIcon />,
        path: '/vaccinate/manage',
      },
      {
        text: `${t('Confirm')}`,
        icon: <ManageHistoryOutlined />,
        path: '/vacineCards/manage',
      },
    ];
  } else {
    filteredMenuItem = [
      {
        text: `${t('Immunization Book')}`,
        icon: <BookSharp />,
        path: '/vacine-record',
      },
      {
        text: `${t('Manage reception')}`,
        icon: <BeenhereIcon />,
        path: '/reception/manage',
      },

      {
        text: `${t('Indications')}`,
        icon: <ContentPasteOutlinedIcon />,
        path: '/registration-form',
      },
      {
        text: `${t('Payment')}`,
        icon: <RequestQuoteIcon />,
        path: '/payment/manage',
      },
      {
        text: `${t('Vaccinate')}`,
        icon: <VaccinesIcon />,
        path: '/vaccinate/manage',
      },
      // {
      //   text: `${t('Nhập liệu')}`,
      //   icon: <PostAddSharpIcon />,
      //   path: '/dataEntry/manage',
      // },
      // {
      //   text: `${t('Reporting statistics')}`,
      //   icon: <AssessmentIcon />,
      //   path: '/reportingStatistics',
      // },
      {
        text: `${t('Confirm')}`,
        icon: <ManageHistoryOutlined />,
        path: '/vacineCards/manage',
      },
    ];
  }

  const handleClick = (path: string) => {
    setActivePath(path);
    history.push(path);
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);
  return (
    <div className={classes.root}>
      {/* app bar  */}
      <AppBar position="fixed" elevation={0} className={`${classes.appBar} noPrint`}>
        <Toolbar>
          <Typography className={classes.header} color="red">
            {''}
          </Typography>
          <div className={classes.language}>
            <Header />
          </div>
        </Toolbar>
      </AppBar>
      {/* side bar */}
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
        anchor="left"
        variant="permanent"
      >
        <div className={classes.title}>
          <img height={100} width={230} alt="logo" src="/static/login/logo_hcdc_s.svg" />
          {/* <Typography color="white" variant="h5">
              HCDC
            </Typography> */}
        </div>
        <Divider />
        <List>
          {filteredMenuItem.map((item: any, i: number) =>
            item.text === `${t('Bill')}` && !name?.find((e) => e.name === 'Cashier') ? (
              item.text === `${t('AAA')}`
            ) : (
              <ListItemButton
                className={activePath.includes(item.path) ? classes.active : ''}
                key={item.text}
                onClick={() => handleClick(item.path)}
              >
                <ListItemIcon
                  className={
                    activePath.includes(item.path) ? classes.iconActive : classes.iconDrawer
                  }
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className={
                    activePath.includes(item.path)
                      ? `${classes.headerActive} ${classes.activeText}`
                      : classes.drawerHeader
                  }
                  primary={item.text}
                />
              </ListItemButton>
            )
          )}
        </List>
      </Drawer>
      <div className={classes.page}>
        {/* <div className={classes.toolbar}></div> */}
        {children}
        {/* <ScrollToTopComponent /> */}
        <ScrollToTop smooth />
      </div>
    </div>
  );
};

export default Layout;
