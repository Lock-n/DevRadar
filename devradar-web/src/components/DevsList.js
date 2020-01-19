import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import api from '../services/api';
import usePrevious from './util/usePrevious';
import DevItem from './DevItem';

const useStyles = createUseStyles({
  devList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    listStyle: 'none',
    padding: '0',
    marginLeft: '20px',
  },
});

export const DevsList = ({ lastAddedDev }) => {
  const [devs, setDevs] = useState([]);

  const previousLastAddedDev = usePrevious(lastAddedDev);

  useEffect(() => {
    if (lastAddedDev !== previousLastAddedDev) {
      setDevs(devs => [...devs, lastAddedDev]);
    }
  }, [previousLastAddedDev, lastAddedDev]);

  useEffect(() => {
    const loadDevs = async () => {
      const response = await api.get('/devs');
      setDevs(response.data);
    };

    loadDevs();
  }, []);

  const classes = useStyles();
  return (
    <main>
      <ul className={classes.devList}>
        {devs.map(dev => (
          <DevItem key={dev._id} dev={dev} />
        ))}
      </ul>
    </main>
  );
};
