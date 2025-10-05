import React from "react";
import dayjs from "dayjs";

const ProfileCreds = ({ experience, education }) => {
  const formatDate = (date) => dayjs(date).format("YYYY/MM/DD");

  const expItems = experience.map((exp) => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        {formatDate(exp.from)} - {exp.to === null ? " Now" : formatDate(exp.to)}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      {exp.location && (
        <p>
          <strong>Location: </strong> {exp.location}
        </p>
      )}
      {exp.description && (
        <p>
          <strong>Description: </strong> {exp.description}
        </p>
      )}
    </li>
  ));

  const eduItems = education.map((edu) => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        {formatDate(edu.from)} - {edu.to === null ? " Now" : formatDate(edu.to)}
      </p>
      <p>
        <strong>Degree:</strong> {edu.degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {edu.fieldofstudy}
      </p>
      {edu.description && (
        <p>
          <strong>Description: </strong> {edu.description}
        </p>
      )}
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
      </div>

      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        {eduItems.length > 0 ? (
          <ul className="list-group">{eduItems}</ul>
        ) : (
          <p className="text-center">No Education Listed</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCreds;
