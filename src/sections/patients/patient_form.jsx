import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postPatient } from '../../redux/patients/patientRequests';

const GenderOptions = ['Male', 'Female'];

const PatientForm = ({isOpen, handleModal}) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: null,
    contact_number: '',
    address: '',
    email: '',
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

    const result = await dispatch(postPatient(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Patient added successfully', {
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
      <TextField
        label="Date of Birth"
        variant="outlined"
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
        error={showWarning && formData.date_of_birth === ''}
        helperText={showWarning && formData.date_of_birth === '' ? 'This field is required' : ''}
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
      <TextField
        label="Address"
        variant="outlined"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.address === ''}
        helperText={showWarning && formData.address === '' ? 'This field is required' : ''}
        required
      />
      <p className="mx-2 mt-1 font-light text-gray-400"> For ex {`'123 Rasty St, Erbil'`}</p>
      <br />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.email === ''}
        helperText={showWarning && formData.email === '' ? 'This field is required' : ''}
        required
      />
      <p className="mx-2 mt-1 font-light text-gray-400"> For ex {`'john.doe@gmail.com'`}</p>
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

export default PatientForm;

PatientForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func
}