import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postDepartment } from '../../redux/departments/departmentRequests';

const DepartmentForm = ({isOpen, handleModal}) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    department_name: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formData).every((value) => value !== '');

    if (!isFormValid) {
      setShowWarning(true);
      return;
    }

    const result = await dispatch(postDepartment(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Department added successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      handleModal(false)
    }
  };

  const isFormEmpty = Object.values(formData).every((value) => value === '');

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Department"
        variant="outlined"
        name="department_name"
        value={formData.department_name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.department_name === ''}
        helperText={showWarning && formData.department_name === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.description === ''}
        helperText={showWarning && formData.description === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={isFormEmpty}
        sx={{ float: 'right' }} // Float the button to the right
      >
        Submit
      </Button>
    </form>
  );
};

export default DepartmentForm;

DepartmentForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func
}