import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { deleteEducation } from '../../actions/profileActions';

const Education = ({ education }) => {
  if (!education|| education.length === 0) {
    return <p>No education  added yet</p>;
  }

  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    dispatch(deleteEducation(id));
  };

  const educationRows = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        {dayjs(edu.from).format('YYYY/MM/DD')} -{' '}
        {edu.to === null ? 'Now' : dayjs(edu.to).format('YYYY/MM/DD')}
      </td>
      <td>
        <button onClick={() => onDeleteClick(edu._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educationRows}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired
};

export default Education;
