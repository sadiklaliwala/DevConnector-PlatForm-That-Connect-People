import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errorsFromState = useSelector(state => state.errors);

  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errorsFromState) {
      setErrors(errorsFromState);
    }
  }, [errorsFromState]);

  const onSubmit = e => {
    e.preventDefault();

    const { user } = auth;

    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar
    };

    dispatch(addComment(postId, newComment));
    setText(''); // clear form after submission
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Make a comment...
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={text}
                onChange={e => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentForm;
