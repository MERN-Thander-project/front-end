import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";

import { useDeletePostMutation, useGetOnePostQuery } from "../services/post";
import ReactMarkdown from "react-markdown";
export const FullPost = () => {
  const params = useParams()
  const { data, error, isLoading } = useGetOnePostQuery(params.id);
  const [deletePostMutation] = useDeletePostMutation();
  console.log(data)
  return (
    <>
      {isLoading ? <Post isLoading={true} /> : <Post
        isLoading={false}
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={0}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>}

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={isLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
