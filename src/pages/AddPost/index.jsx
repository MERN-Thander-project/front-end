import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectAuthData } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useCreatePostMutation, useUploadImageMutation } from '../../services/post';

export const AddPost = () => {
  const navigate = useNavigate()
  const [uploadImageMutation, { data, error, isLoading }] = useUploadImageMutation();
  const [createPostMutation, { isLoadingPost, errorPost }] = useCreatePostMutation();
  const isAuth = useSelector(selectAuthData)
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setaTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputFileRef = useRef(null)

  const handleChangeFile = async (event) => {
    try {
      // Отримуємо вибраний файл з події
      const file = event.target.files[0];
      console.log(file)
      // Викликаємо мутацію для завантаження файлу на сервер
      const result = await uploadImageMutation(file);

      // Перевіряємо результат завантаження файлу і виводимо повідомлення про успішне завантаження

      setImageUrl(result.data.url)
      console.log('Image uploaded successfully! ', result.data, imageUrl);
    } catch (error) {
      // Обробляємо помилки, якщо вони виникають під час завантаження файлу
      console.error('Error uploading image:', error);
    }
  };


  const onClickRemoveImage = async (event) => {
    setImageUrl('')
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        tags,
        text
      }
      const result = await createPostMutation(fields)
      console.log(result.data._id)
      navigate(`/posts/${result.data._id}`)
    } catch (error) {
      
    }
  }
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  console.log(title, tags, text)
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: '...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if (!isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Попередній варіант
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Видалити
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={e => setaTitle(e.target.value)}

      />
      <TextField classes={{ root: styles.tags }}
        value={tags}
        onChange={e => setTags(e.target.value)}
        variant="standard"
        placeholder="Тэги"
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опублікувати
        </Button>
        <a href="/">
          <Button size="large">Скасувати</Button>
        </a>
      </div>
    </Paper>
  );
};
