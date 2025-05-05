import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Iconify } from '../../components/iconify';
import { deleteAppointment, updateAppointment } from '../../redux/appointments/appointmentsRequests';
import { getPatients } from '../../redux/patients/patientRequests';
import { getDoctors } from '../../redux/doctors/doctorsRequests';

// ----------------------------------------------------------------------

export function AppointmentTableRow({ row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState({ ...row });

  const dispatch = useDispatch();

  const { patients_data } = useSelector((state) => state.patients);
  const { doctors_data } = useSelector((state) => state.doctors);

  const [patientsLoaded, setPatientsLoaded] = useState(false);
  const [doctorsLoaded, setDoctorsLoaded] = useState(false);

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAppointment(id));
      toast.success('Appointment deleted successfully', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'light',
      });
    } catch (error) {
      toast.error('Delete failed!', {
        position: 'top-center',
        autoClose: 1500,
        theme: 'light',
      });
    }
  };

  console.log('appointment row:', row);

  const handleEdit = async () => {
    handleClosePopover();

    const patientsResult = await dispatch(getPatients());
    const doctorsResult = await dispatch(getDoctors());

    if (
      patientsResult.meta.requestStatus === 'fulfilled' &&
      doctorsResult.meta.requestStatus === 'fulfilled'
    ) {
      setPatientsLoaded(true);
      setDoctorsLoaded(true);
      setIsEditing(true);
    } else {
      toast.error('Failed to load data', {
        position: 'top-center',
        autoClose: 1500,
        theme: 'light',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const selectedPatient = patients_data.find((p) => p.patient_id === editedRow.patient_id);
    const selectedDoctor = doctors_data.find((d) => d.doctor_id === editedRow.doctor_id);

    const formattedAppointmentDate = editedRow.appointment_time.slice(0, 10); 

    const updatedAppointment = {
      appointment_id: editedRow.appointment_id,
      patient_id: editedRow.patient_id,
      doctor_id: editedRow.doctor_id,
      status: editedRow.status,
      appointment_time: formattedAppointmentDate, 
      patient_first_name: selectedPatient
        ? selectedPatient.first_name
        : editedRow.patient_first_name,
      patient_last_name: selectedPatient ? selectedPatient.last_name : editedRow.patient_last_name,
      doctor_first_name: selectedDoctor ? selectedDoctor.first_name : editedRow.doctor_first_name,
      doctor_last_name: selectedDoctor ? selectedDoctor.last_name : editedRow.doctor_last_name,
    };

    const result = await dispatch(updateAppointment(updatedAppointment));

    if (result.meta.requestStatus === 'fulfilled') {
      setIsEditing(false);
      toast.success('Appointment updated successfully', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'light',
      });

      setEditedRow({
        ...editedRow,
        patient_first_name: selectedPatient
          ? selectedPatient.first_name
          : editedRow.patient_first_name,
        patient_last_name: selectedPatient
          ? selectedPatient.last_name
          : editedRow.patient_last_name,
        doctor_first_name: selectedDoctor ? selectedDoctor.first_name : editedRow.doctor_first_name,
        doctor_last_name: selectedDoctor ? selectedDoctor.last_name : editedRow.doctor_last_name,
      });
    } else {
      toast.error('Update failed!', {
        position: 'top-center',
        autoClose: 1500,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>
          {isEditing ? (
            patientsLoaded ? (
              <TextField
                select
                size="small"
                name="patient_id"
                value={editedRow.patient_id}
                onChange={handleChange}
                fullWidth
              >
                {patients_data.map((patient) => (
                  <MenuItem key={patient.patient_id} value={patient.patient_id}>
                    {patient.first_name} {patient.last_name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField size="small" disabled value="Loading patients..." />
            )
          ) : (
            `${row.patient_first_name} ${row.patient_last_name}`
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            doctorsLoaded ? (
              <TextField
                select
                size="small"
                name="doctor_id"
                value={editedRow.doctor_id}
                onChange={handleChange}
                fullWidth
              >
                {doctors_data.map((doctor) => (
                  <MenuItem key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.first_name} {doctor.last_name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField size="small" disabled value="Loading doctors..." />
            )
          ) : (
            `${row.doctor_first_name} ${row.doctor_last_name}`
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="status"
              value={editedRow.status || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.status
          )}
        </TableCell>


        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="appointment_time"
              type="date"
              value={editedRow.appointment_time.slice(0, 10)}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.appointment_time.slice(0, 10)
          )}
        </TableCell>

        <TableCell align="right">
          {isEditing ? (
            <Button variant="contained" size="small" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <IconButton onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => handleDelete(row.appointment_id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

AppointmentTableRow.propTypes = {
  row: PropTypes.shape({
    appointment_id: PropTypes.number.isRequired,
    patient_id: PropTypes.number.isRequired,
    doctor_id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    appointment_time: PropTypes.string.isRequired,
    patient_first_name: PropTypes.string.isRequired,
    patient_last_name: PropTypes.string.isRequired,
    doctor_first_name: PropTypes.string.isRequired,
    doctor_last_name: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};
