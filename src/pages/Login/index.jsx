import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useLoginMutation } from "../../services/post";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData, setAuthData } from "../../redux/slices/authSlice";

export const Login = () => {
  const auth = useSelector(selectAuthData)
  const dispatch = useDispatch()
  const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
    , mode: 'onChange'
  })





  if (auth) {
    return <Navigate to = '/' />
  }
  // useEffect(())
  const onSubmit = async (value) => {
    
    const response = await loginMutation(value);
    const { data } = response;
    console.log(response)
    try {
      if('token' in data) {
        window.localStorage.setItem('token',data.token)
      } 
      dispatch(setAuthData(data))
      
    } catch (error) {
      alert('не вдалось авторизуватись')
    }
  }
  return (
    <Paper elevation={1} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Вкажіть пошту' })}
          fullWidth
        />
        <TextField className={styles.field} error={Boolean(errors.password?.message)} helperText={errors.password?.message} label="Пароль" fullWidth
          {...register('password', { required: 'Вкажіть пароль' })} />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
