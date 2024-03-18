import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import { Link } from 'react-router-dom';
import Link from '@mui/joy/Link';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/joy/Typography';
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

const useStyles = makeStyles({
  link: {
    color: '#72AFD2!important',
    textDecoration: 'none',
    fontSize: '20px!important',
  },
});
export default function Breadcrumb({ items, text, style }: any) {
  const classes = useStyles();
  return (
    <div role="presentation" onClick={handleClick} style={style}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {items.map((e: any, index: number) => (
          // <Link key={index} className={classes.link} to={e.href}>
          <Link key={index} color="primary" href={e.href} className={classes.link}>
            {e.content}
          </Link>
        ))}
        <Typography>{text}</Typography>
      </Breadcrumbs>
    </div>
  );
}
