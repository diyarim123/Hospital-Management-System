import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { getPatients } from '../../redux/patients/patientRequests';
import { postBilling } from '../../redux/billings/billingRequests';

const StatusOptions = ['Paid', 'Not Paid', 'Insurance'];

const BillingForm = ({ isOpen, handleModal }) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);

  const { patients_data } = useSelector((state) => state.patients);

  const [formData, setFormData] = useState({
    patient_id: null,
    amount: '',
    payment_status: '',
    bill_date: '',
    patient_first_name: '',
    patient_last_name: '',
  });

  useEffect(() => {
    dispatch(getPatients());
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

    console.log('submitting data', formData);

    const result = await dispatch(postBilling(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Bill added successfully', {
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
      toast.error('Failed to add bill', {
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

      <br />
      <Autocomplete
        disablePortal
        options={StatusOptions}
        name="payment_status"
        value={formData.payment_status}
        onChange={(event, newValue) =>
          setFormData({
            ...formData,
            payment_status: newValue || '',
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Payment Status"
            error={showWarning && formData.payment_status === ''}
            helperText={
              showWarning && formData.payment_status === '' ? 'This field is required' : ''
            }
            required
          />
        )}
      />
      <br />
      <TextField
        label="Amount"
        variant="outlined"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
        error={showWarning && formData.amount === ''}
        helperText={showWarning && formData.amount === '' ? 'This field is required' : ''}
        required
      />
      <br />
      <TextField
        label="Bill Date"
        variant="outlined"
        type="date"
        name="bill_date"
        value={formData.bill_date}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
        error={showWarning && formData.bill_date === ''}
        helperText={showWarning && formData.bill_date === '' ? 'This field is required' : ''}
        required
      />
      <br />
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

export default BillingForm;

BillingForm.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};
