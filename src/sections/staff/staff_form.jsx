import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getDepartments } from '../../redux/departments/departmentRequests';
import { postStaff } from '../../redux/staff/staffRequests';

const GenderOptions = ['Male', 'Female'];
const RoleOptions = ['Nurse', 'Receptionist', 'Technician', 'Admin', 'Support'];

const StaffForm = ({ isOpen, handleModal }) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const { departments_loading, departments_data, departments_err } = useSelector(
    (state) => state.departments
  );
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: null,
    gender: null,
    contact_number: '',
    department_id: null,
    department_name: '',
  });
;
  console.log('formData before submitting:', formData);


  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

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

    const result = await dispatch(postStaff(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Staff added successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      handleModal(false);
    } else {
      toast.error('Failed to add a staff', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const isFormEmpty = Object.values(formData).every((value) => value === '');

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="outlined"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.first_name === ''}
        helperText={showWarning && formData.first_name === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <TextField
        label="Last Name"
        variant="outlined"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.last_name === ''}
        helperText={showWarning && formData.last_name === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <Autocomplete
        disablePortal
        options={GenderOptions}
        name="gender"
        value={formData.gender}
        onChange={(event, newValue) =>
          setFormData({
            ...formData,
            gender: newValue || '',
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Gender"
            error={showWarning && formData.gender === ''}
            helperText={showWarning && formData.gender === '' ? 'This field is required' : ''}
            required
          />
        )}
      />
      <br />
      <Autocomplete
        disablePortal
        options={RoleOptions}
        name="role"
        value={formData.role}
        onChange={(event, newValue) =>
          setFormData({
            ...formData,
            role: newValue || '',
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Role"
            error={showWarning && formData.role === ''}
            helperText={showWarning && formData.role === '' ? 'This field is required' : ''}
            required
          />
        )}
      />
      <br />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.contact_number === ''}
        helperText={showWarning && formData.contact_number === '' ? 'This field is required' : ''}
        required
      />
      <p className="mx-2 mt-1 font-light text-gray-400"> For ex {`'+9647xxxxxxxxx'`}</p>
      <br />
      <Autocomplete
        disablePortal
        options={departments_data || []}
        getOptionLabel={(option) => option.department_name || ''} // Ensure it returns a string
        value={
          (departments_data || []).find((dept) => dept.department_id === formData.department_id) ||
          null
        }
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            department_id: newValue ? newValue.department_id : null,
            department_name: newValue ? newValue.department_name : '',
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Department"
            error={showWarning && !formData.department_id}
            helperText={showWarning && !formData.department_id ? 'This field is required' : ''}
            required
          />
        )}
        sx={{ mb: 2 }}
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

export default StaffForm;

StaffForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};
