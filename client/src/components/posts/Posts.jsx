import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

const Posts = () => {
  const dispatch = useDispatch();

  // Get posts state from Redux
  const { posts, loading } = useSelector((state) => state.post);

  // Load posts on mount
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  useEffect(() => {
    console.log("📍 Posts component mounted, fetching posts...");
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log("📦 Posts state:", posts);
    console.log("⏳ Loading:", loading);
  }, [posts, loading]);

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
