import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { deleteExperience } from '../../actions/profileActions';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    dispatch(deleteExperience(id));
  };

  const experienceRows = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        {dayjs(exp.from).format('YYYY/MM/DD')} -{' '}
        {exp.to === null ? 'Now' : dayjs(exp.to).format('YYYY/MM/DD')}
      </td>
      <td>
        <button onClick={() => onDeleteClick(exp._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experienceRows}</tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
