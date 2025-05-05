import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { getPatients } from '../../redux/patients/patientRequests';
import { getDoctors } from '../../redux/doctors/doctorsRequests';
import { postMedical } from '../../redux/medical_records/medicalRequests'; // Assuming you have this

const RecordForm = ({ isOpen, handleModal }) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);

  const { patients_data } = useSelector((state) => state.patients);
  const { doctors_data } = useSelector((state) => state.doctors);

  const [formData, setFormData] = useState({
    patient_id: null,
    patient_first_name: '',
    patient_last_name: '',
    doctor_id: null,
    doctor_first_name: '',
    doctor_last_name: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    record_date: '',
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

    console.log('Submitting form data:', formData);

    const result = await dispatch(postMedical(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Record added successfully', {
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
      toast.error('Failed to add record', {
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
        value={(patients_data || []).find((p) => p.patient_id === formData.patient_id) || null}
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            patient_id: newValue ? newValue.patient_id : null,
            patient_first_name: newValue ? newValue.first_name : '',
            patient_last_name: newValue ? newValue.last_name : '',
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
        value={(doctors_data || []).find((d) => d.doctor_id === formData.doctor_id) || null}
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            doctor_id: newValue ? newValue.doctor_id : null,
            doctor_first_name: newValue ? newValue.first_name : '',
            doctor_last_name: newValue ? newValue.last_name : '',
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

      {/* Diagnosis */}
      <TextField
        label="Diagnosis"
        variant="outlined"
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.diagnosis === ''}
        helperText={showWarning && formData.diagnosis === '' ? 'This field is required' : ''}
        required
        sx={{ mb: 2 }}
      />

      {/* Treatment */}
      <TextField
        label="Treatment"
        variant="outlined"
        name="treatment"
        value={formData.treatment}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.treatment === ''}
        helperText={showWarning && formData.treatment === '' ? 'This field is required' : ''}
        required
        sx={{ mb: 2 }}
      />

      {/* Prescription */}
      <TextField
        label="Prescription"
        variant="outlined"
        name="prescription"
        value={formData.prescription}
        onChange={handleChange}
        fullWidth
        error={showWarning && formData.prescription === ''}
        helperText={showWarning && formData.prescription === '' ? 'This field is required' : ''}
        required
        sx={{ mb: 2 }}
      />

      {/* Record Date */}
      <TextField
        label="Record Date"
        variant="outlined"
        type="date"
        name="record_date"
        value={formData.record_date}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        error={showWarning && formData.record_date === ''}
        helperText={showWarning && formData.record_date === '' ? 'This field is required' : ''}
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

export default RecordForm;

RecordForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};
