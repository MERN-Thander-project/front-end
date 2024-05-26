import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useGetAllPostQuery } from '../services/post';
import { useGetAllTegsQuery } from '../services/tegs';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../redux/slices/authSlice';

export const Home = (props) => {
  const { data: postsData, error: postsError, isLoading: postsLoading, refetch, isFetching } = useGetAllPostQuery();
  const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useGetAllTegsQuery();
  const isAuth = useSelector(selectAuthData)
  
  useEffect(() => {
    // console.log(postsData.map((obj)=> {
    //   console.log(obj.imageUrl)
    // }))
    console.log(postsData)
    refetch();
    
  }, [props,postsData]);
  
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {postsLoading || isFetching
            ? [...Array(5)].map((_, index) => <Post key={index} tags={[]} isLoading={true} />)
            : postsData.map((obj) => (
              
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl?`http://localhost:4444${obj.imageUrl}`:''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={0}
                tags={obj.tags}
                isEditable={isAuth?._id === obj.user._id}
                isLoading={postsLoading}
              />
            ))
          }
        </Grid>
        <Grid item xs={4}>
          <TagsBlock items={tagsData} isLoading={tagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};