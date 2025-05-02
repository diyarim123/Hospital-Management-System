import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { getPatients } from '../../redux/patients/patientRequests';
import { getDoctors } from '../../redux/doctors/doctorsRequests';
import { postAppointment } from '../../redux/appointments/appointmentsRequests'; // Assuming you have this

const AppointmentForm = ({ isOpen, handleModal }) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);

  const { patients_data } = useSelector((state) => state.patients);
  const { doctors_data } = useSelector((state) => state.doctors);

  const [formData, setFormData] = useState({
    patient_id: null,
    patient_name: '',
    doctor_id: null,
    doctor_name: '',
    status: '',
    appointment_time: '',
  });

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
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

    const isFormValid = Object.values(formData).every((value) => value !== '' && value !== null);

    if (!isFormValid) {
      setShowWarning(true);
      return;
    }

    const result = await dispatch(postAppointment(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Appointment added successfully', {
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
      toast.error('Failed to add appointment', {
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

  const isFormEmpty = Object.values(formData).every((value) => value === '' || value === null);

  return (
    <form onSubmit={handleSubmit}>
      {/* Select Patient */}
      <Autocomplete
        disablePortal
        options={patients_data || []}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        value={
          (patients_data || []).find((p) => p.patient_id === formData.patient_id) || null
        }
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            patient_id: newValue ? newValue.patient_id : null,
            patient_name: newValue ? `${newValue.first_name} ${newValue.last_name}` : '',
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Patient"
            error={showWarning && !formData.patient_id}
            helperText={showWarning && !formData.patient_id ? 'This field is required' : ''}
            required
          />
        )}
        sx={{ mb: 2 }}
      />

      {/* Select Doctor */}
      <Autocomplete
        disablePortal
        options={doctors_data || []}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        value={
          (doctors_data || []).find((d) => d.doctor_id === formData.doctor_id) || null
        }
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            doctor_id: newValue ? newValue.doctor_id : null,
            doctor_name: newValue ? `${newValue.first_name} ${newValue.last_name}` : '',
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Doctor"
            error={showWarning && !formData.doctor_id}
            helperText={showWarning && !formData.doctor_id ? 'This field is required' : ''}
            required
          />
        )}
        sx={{ mb: 2 }}
      />


      <TextField
        label="Status"
        variant="outlined"
        name="status"
        value={formData.status}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.status === ''}
        helperText={showWarning && formData.status === '' ? 'This field is required' : ''}
        required
        sx={{ mb: 2 }}
      />


      {/* Appointment Time */}
      <TextField
        label="Appointment Time"
        variant="outlined"
        name="appointment_time"
        placeholder="YYYY-MM-DD"
        value={formData.appointment_time}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.appointment_time === ''}
        helperText={showWarning && formData.appointment_time === '' ? 'This field is required' : ''}
        required
        sx={{ mb: 2 }}
      />
      <p className="mx-2 mt-1 font-light text-gray-400"> For ex {`'2025-04-27'`} </p>

      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={isFormEmpty}
        sx={{ float: 'right' }}
      >
        Submit
      </Button>
    </form>
  );
};

export default AppointmentForm;

AppointmentForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};
