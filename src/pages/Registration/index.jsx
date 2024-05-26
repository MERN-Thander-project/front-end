import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useRegisterMutation } from "../../services/post";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData, setAuthData } from "../../redux/slices/authSlice";

export const Registration = () => {
  const auth = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const [registerMutation, { isLoading, isError, error }] = useRegisterMutation();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    },
    mode: 'onChange'
  });
  
  if (auth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (value) => {
    console.log(value)
    const response = await registerMutation(value);
    const { data } = response;
    console.log(response);
    try {
      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
        dispatch(setAuthData(Boolean(data)));
      }
    } catch (error) {
      alert('Не вдалося зареєструватися');
    }
  };

  return (
    <Paper elevation={1} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Вкажіть повне ім\'я' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Вкажіть пошту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Вкажіть пароль' })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth disabled={!isValid || isLoading}>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};