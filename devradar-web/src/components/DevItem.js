import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  devItem: {
    backgroundColor: '#FFF',
    borderRadius: '2px',
    boxShadow: '0 0 14px 0 rgba(0, 0, 0, 0.05)',
    padding: 20,
  },
  devItem__header: {
    display: 'flex',
    alignItems: 'center',
  },
  devItem__info: {
    marginLeft: 10,

    '& h5': {
      fontSize: 16,
      color: '#333',
    },

    '& span': {
      fontSize: 16,
      color: '#999',
      marginTop: '2px',
    },
  },
  devItem__image: { width: 54, height: 54, borderRadius: '50%' },
  devItem__details: {
    fontSize: '14px',
    '& p': {
      color: '#666',
      lineHeight: '20px',
      margin: '10px 0',
    },
    '& a': {
      '&:hover': {
        color: '#5A2EA6',
      },
      color: '#8e4dff',
      textDecoration: 'none',
    },
  },
});

const DevItem = ({ dev }) => {
  const classes = useStyles();
  return (
    <li className={classes.devItem}>
      <div className={classes.devItem__header}>
        <img className={classes.devItem__image} src={dev.avatar_url} alt={dev.name} />
        <div className={classes.devItem__info}>
          <h5 className={classes.devItem__info__devName}>{dev.name}</h5>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </div>
      <div className={classes.devItem__details}>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do Github</a>
      </div>
    </li>
  );
};

export default DevItem;
