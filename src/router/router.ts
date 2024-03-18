import React from 'react';
import { RouteProps } from 'react-router-dom';

interface Router {
  components?: React.ReactNode;
  path: string;
  title: string;
  child?: Router[];
  icon?: React.ReactNode;
}

const routerItem: Router[] = [
  // {
  //   path: '/vacine-record',
  //   title: 'Sổ Tiêm Chủng',
  //   components: VacineRecordFeature
  // },
  // {
  //   path: '/vacine-card',
  //   title: 'Phiếu Tiêm Chủng',
  //   components: VacineCardFeature,
  //   child: [
  //     {
  //       path:"/vacine-card/manage",
  //       title: "Quan Ly",
  //       components: ManagePage
  //     }
  //   ]
  // },
];

export default routerItem;
