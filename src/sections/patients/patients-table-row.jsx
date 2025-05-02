import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
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
import { deletePatient, updatePatient } from '../../redux/patients/patientRequests';

// ----------------------------------------------------------------------

export function PatientTableRow({ row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState({ ...row });

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePatient(id));
      toast.success('Patient deleted successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      toast.error('Delete failed!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleClosePopover();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [name]: name === 'contact_number' ? value.replace(/\D/g, '') : value, // Ensure contact number is numeric
    }));
  };

  const handleSave = async () => {
    const updatedPatient = {
      ...editedRow,
      date_of_birth: editedRow.date_of_birth?.substring(0, 10) || null,
    };

    const result = await dispatch(updatePatient(updatedPatient));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Patient updated successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error('Update failed!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {isEditing ? (
              <>
                <TextField
                  size="small"
                  name="first_name"
                  value={editedRow.first_name || ''}
                  onChange={handleChange}
                  placeholder="First Name"
                  fullWidth
                />
                <TextField
                  size="small"
                  name="last_name"
                  value={editedRow.last_name || ''}
                  onChange={handleChange}
                  placeholder="Last Name"
                  fullWidth
                />
              </>
            ) : (
              `${row.first_name} ${row.last_name}`
            )}
          </Box>
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              type="date"
              name="date_of_birth"
              value={editedRow.date_of_birth ? editedRow.date_of_birth.substring(0, 10) : ''}
              onChange={handleChange}
              fullWidth
            />
          ) : row.date_of_birth ? (
            new Date(row.date_of_birth).toISOString().substring(0, 10)
          ) : (
            'N/A'
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              select
              size="small"
              name="gender"
              value={editedRow.gender || ''}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          ) : (
            <p className="gender">{row.gender}</p>
          )}
        </TableCell>

        <TableCell align="center">
          {isEditing ? (
            <TextField
              size="small"
              name="contact_number"
              value={editedRow.contact_number || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.contact_number
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="address"
              value={editedRow.address || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.address
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="email"
              value={editedRow.email || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.email
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

          <MenuItem onClick={() => handleDelete(row.patient_id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

PatientTableRow.propTypes = {
  row: PropTypes.shape({
    patient_id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    contact_number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};
