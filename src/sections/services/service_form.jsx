import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postService } from '../../redux/services/serviceRequests';

const GenderOptions = ['Male', 'Female'];

const ServiceForm = ({isOpen, handleModal}) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    cost: '',
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

    const result = await dispatch(postService(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Service added successfully', {
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
        label="Service Name"
        variant="outlined"
        name="service_name"
        value={formData.service_name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.service_name === ''}
        helperText={showWarning && formData.service_name === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <TextField
        label="Cost"
        variant="outlined"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
        error={showWarning && formData.cost === ''}
        helperText={showWarning && formData.cost === '' ? 'This field is required' : ''}
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
        sx={{ float: 'right', mt: 2 }} // Float the button to the right
      >
        Submit
      </Button>
    </form>
  );
};

export default ServiceForm;

ServiceForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func
}