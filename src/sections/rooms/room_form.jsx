import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postRoom } from '../../redux/rooms/roomRequests';

const RoomTypeOptions = ['Surgery', 'ICU', 'General'];
const AvailabilityOptions = ['Available', 'Occupied'];

const RoomForm = ({ isOpen, handleModal }) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    room_number: null,
    room_type: '',
    capacity: null,
    availability_type: '',
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

    const result = await dispatch(postRoom(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Room added successfully', {
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
    }
  };

  const isFormEmpty = Object.values(formData).every((value) => value === '');

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Room Number"
        variant="outlined"
        name="room_number"
        value={formData.room_number}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.room_number === ''}
        helperText={showWarning && formData.room_number === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <Autocomplete
        disablePortal
        options={RoomTypeOptions}
        name="room_type"
        value={formData.room_type}
        onChange={(event, newValue) =>
          setFormData({
            ...formData,
            room_type: newValue || '',
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Room Type"
            error={showWarning && formData.room_type === ''}
            helperText={showWarning && formData.room_type === '' ? 'This field is required' : ''}
            required
          />
        )}
      />
      <br />
      <TextField
        label="Capacity"
        variant="outlined"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={showWarning && formData.capacity === ''}
        helperText={showWarning && formData.capacity === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <Autocomplete
        disablePortal
        options={AvailabilityOptions}
        name="availability_type"
        value={formData.availability_type}
        onChange={(event, newValue) =>
          setFormData({
            ...formData,
            availability_type: newValue || '',
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Availability Type"
            error={showWarning && formData.availability_type === ''}
            helperText={showWarning && formData.availability_type === '' ? 'This field is required' : ''}
            required
          />
        )}
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

export default RoomForm;

RoomForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};
