import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from '../services/api';

const useStyles = createUseStyles({
  input: {
    width: '100%',
    height: 32,
    fontSize: 14,
    color: '#666',
    border: 0,
    borderBottom: '1px solid #EEE',
  },
  label: {
    fontSize: 14,
    color: '#ACACAC',
    fontWeight: 'bold',
  },
  form: { marginTop: 30 },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
  container: {
    width: '320px',
    borderRadius: '2px',
    padding: '30px 20px',
    backgroundColor: '#FFF',
    boxShadow: '0 0 14px 0 rgba(0, 0, 0, 0.05)',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  inputGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroupChild: {
    width: 'calc(1/2*100% - (1 - 1/2)*20px)',
  },
  button: {
    '&:hover': {
      backgroundColor: '#6931ca',
    },
    transition: 'background 0.5s',
    border: 0,
    width: '100%',
    marginTop: '30px',
    backgroundColor: '#7d40e7',
    borderRadius: 2,
    padding: '15px 12px',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    cursor: 'pointer',
  },
});

export const Sidebar = ({ onAddedDev }) => {
  const [position, setPosition] = useState({ latitude: '', longitude: '' });
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosition(position.coords);
      },
      error => {
        console.log(error);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  const handleAddDev = async e => {
    e.preventDefault();

    const response = await api.post('devs/', {
      github_username: githubUsername,
      techs,
      location: {
        lat: position.latitude,
        lon: position.longitude,
      },
    });

    setGithubUsername('');
    setTechs('');

    if (onAddedDev) onAddedDev(response.data);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Cadastrar</h3>
      <form className={classes.form} onSubmit={handleAddDev}>
        <div className={classes.inputContainer} style={{ marginTop: 0 }}>
          <label className={classes.label} htmlFor='github_username'>
            Username do Github:
          </label>
          <input
            className={classes.input}
            name='github_username'
            type='text'
            value={githubUsername}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>
        <div className={classes.inputContainer}>
          <label className={classes.label} htmlFor='techs'>
            Tecnologias:
          </label>
          <input
            className={classes.input}
            name='techs'
            type='text'
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
        <div className={classes.inputGroupContainer}>
          <div className={[classes.inputContainer, classes.inputGroupChild].join(' ')}>
            <label className={classes.label} htmlFor='latitude'>
              Latitude:
            </label>
            <input
              className={classes.input}
              type='text'
              name='latitude'
              value={position.latitude}
              onChange={e => setPosition({ ...position, latitude: e.target.value })}
            />
          </div>
          <div className={[classes.inputContainer, classes.inputGroupChild].join(' ')}>
            <label className={classes.label} htmlFor='longitude'>
              Longitude:
            </label>
            <input
              className={classes.input}
              type='text'
              name='longitude'
              value={position.longitude}
              onChange={e => setPosition({ ...position, longitude: e.target.value })}
            />
          </div>
        </div>
        <button type='submit' className={classes.button}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};
