import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

const CommentItem = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt={comment.name}
            />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id && (
            <button
              onClick={handleDelete}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentItem;
