import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const auth = useSelector((state) => state.auth);
  const errorsFromState = useSelector((state) => state.errors);

  // Local state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [errors, setErrors] = useState({});

  const { name, email, password, password2 } = formData;

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  // Sync errors from redux into local state
  useEffect(() => {
    if (errorsFromState) {
      setErrors(errorsFromState);
    }
  }, [errorsFromState]);

  // Handle input change
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password, password2 };
    dispatch(registerUser(newUser, navigate));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create your DevConnector account
            </p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={onChange}
                error={errors.password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Register;
