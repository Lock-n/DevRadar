import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DevsList } from './components/DevsList';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: 30,
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    backgroundColor: '#EEE',
  },
});

function App() {
  let [lastAddedDev, setLastAddedDev] = useState(undefined);
  const onAddedDev = dev => {
    setLastAddedDev(dev);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Sidebar onAddedDev={onAddedDev} />
      <DevsList lastAddedDev={lastAddedDev} />
    </div>
  );
}

export default App;
