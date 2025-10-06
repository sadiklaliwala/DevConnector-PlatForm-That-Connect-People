import axios from '../utils/axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from './types';

// Add Post
export const addPost = (postData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    const res = await axios.post('/api/posts', postData);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || { error: 'Failed to add post' }
    });
  }
};

// Get Posts
export const getPosts = () => async (dispatch) => {
  dispatch(setPostLoading());
  try {
        console.log('🟡 Making request to /api/posts');        
        const res = await axios.get('/api/posts');
        console.log('🟡request commed ',res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

// Get Post
export const getPost = (id) => async (dispatch) => {
  dispatch(setPostLoading());
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || { error: 'Failed to delete post' }
    });
  }
};

// Add Like
export const addLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/like/${id}`);
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || { error: 'Failed to add like' }
    });
  }
};

// Remove Like
export const removeLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/unlike/${id}`);
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || { error: 'Failed to remove like' }
    });
  }
};

// Add Comment
export const addComment = (postId, commentData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || { error: 'Failed to add comment' }
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || { error: 'Failed to delete comment' }
    });
  }
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};