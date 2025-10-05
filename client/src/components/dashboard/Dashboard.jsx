import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

const Dashboard = () => {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const profileState = useSelector(state => state.profile);
  const { user } = auth;
  const { profile, loading } = profileState;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const onDeleteClick = () => {
    dispatch(deleteAccount());
  };

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div style={{ marginBottom: '60px' }} />
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object
};

export default Dashboard;
