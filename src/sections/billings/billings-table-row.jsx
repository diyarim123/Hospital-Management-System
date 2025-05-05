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
import { deleteBilling, updateBilling } from '../../redux/billings/billingRequests';
import { getPatients } from '../../redux/patients/patientRequests';

const statusOptions = ['Paid', 'Not Paid', 'Insurance'];

export function BillingTableRow({ row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState({ ...row });

  const dispatch = useDispatch();

  const { patients_data } = useSelector((state) => state.patients);

  const [patientsLoaded, setPatientsLoaded] = useState(false);

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBilling(id));
      toast.success('Bill deleted successfully', {
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

  const handleEdit = async () => {
    handleClosePopover();

    const patientsResult = await dispatch(getPatients());

    if (patientsResult.meta.requestStatus === 'fulfilled') {
      setPatientsLoaded(true);
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

    const updatedBill = {
      bill_id: editedRow.bill_id,
      patient_id: editedRow.patient_id,
      amount: editedRow.amount,
      payment_status: editedRow.payment_status,
      bill_date: editedRow.bill_date.slice(0, 10),
      patient_first_name: selectedPatient
        ? selectedPatient.first_name
        : editedRow.patient_first_name,
      patient_last_name: selectedPatient ? selectedPatient.last_name : editedRow.patient_last_name,
    };

    const result = await dispatch(updateBilling(updatedBill));

    if (result.meta.requestStatus === 'fulfilled') {
      setIsEditing(false);
      toast.success('Bill updated successfully', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'light',
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
            <TextField
              size="small"
              name="amount"
              value={editedRow.amount}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.amount
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              select
              size="small"
              name="payment_status"
              value={editedRow.payment_status}
              onChange={handleChange}
              fullWidth
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            row.payment_status
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="bill_date"
              type="date"
              value={editedRow.bill_date?.slice(0, 10)}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.bill_date?.slice(0, 10)
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

          <MenuItem onClick={() => handleDelete(row.bill_id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

BillingTableRow.propTypes = {
  row: PropTypes.shape({
    bill_id: PropTypes.number.isRequired,
    patient_id: PropTypes.number.isRequired,
    amount: PropTypes.string.isRequired,
    payment_status: PropTypes.string.isRequired,
    bill_date: PropTypes.string.isRequired,
    patient_first_name: PropTypes.string.isRequired,
    patient_last_name: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};
