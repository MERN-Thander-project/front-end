import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom';
import { clearAuthData, selectAuthData } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export const Header = (props) => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuthData)

  const onClickLogout = () => {
    if(window.confirm("are you sure?")){
      dispatch(clearAuthData())
      window.localStorage.removeItem('token')
    }
  };
  
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/" onClick={props.value}>
            <div>ThunderBlog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Додати статтю</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
