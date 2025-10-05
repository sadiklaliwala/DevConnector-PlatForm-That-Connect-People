import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handle } = useParams();

  const { profile, loading } = useSelector((state) => state.profile);

  // Load profile on mount when handle changes
  useEffect(() => {
    if (handle) {
      dispatch(getProfileByHandle(handle));
    }
  }, [dispatch, handle]);

  // Redirect to not-found if profile is null after loading
  useEffect(() => {
    if (!loading && profile === null) {
      navigate("/not-found");
    }
  }, [loading, profile, navigate]);

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
