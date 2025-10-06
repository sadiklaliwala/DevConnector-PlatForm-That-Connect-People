import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

const PostForm = () => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  // Get redux state
  const auth = useSelector((state) => state.auth);
  const propErrors = useSelector((state) => state.errors);

  // Replace componentWillReceiveProps with useEffect
  useEffect(() => {
    if (propErrors) {
      setErrors(propErrors);
    }
  }, [propErrors]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
    };

    dispatch(addPost(newPost));
    setText(""); // reset after submit
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Say Something...
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
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

// PostForm.propTypes = {
//   addPost: PropTypes.func, // optional, since we're using dispatch
//   auth: PropTypes.object,
//   errors: PropTypes.object,
// };

export default PostForm;
