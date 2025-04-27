import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { deleteDoctor, updateDoctor } from '../../redux/doctors/doctorsRequests';
import { getDepartments } from '../../redux/departments/departmentRequests';

// ----------------------------------------------------------------------

export function DoctorTableRow({ row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [departmentsReady, setDepartmentsReady] = useState(false);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState({ ...row });

  const { departments_loading, departments_data, departments_err } = useSelector(
    (state) => state.departments
  );

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDoctor(id));
      toast.success('Doctor deleted successfully', {
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
      console.log('id', id);
      console.log(error);
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

  const handleEdit = async () => {
    handleClosePopover();
    setDepartmentsReady(false); // Reset departmentsReady before fetching

    const result = await dispatch(getDepartments());

    if (result.meta.requestStatus === 'fulfilled') {
      setDepartmentsReady(true); // Now departments are ready
      setIsEditing(true);
    } else {
      toast.error('Failed to load departments', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        theme: 'light',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [name]: name === 'contact_number' ? value.replace(/\D/g, '') : value, // Ensure contact number is numeric
    }));
  };

  const handleSave = async () => {
    // Find the selected department name based on the new department_id
    const selectedDepartment = departments_data.find(
      (dept) => dept.department_id === editedRow.department_id
    );
  
    const updatedDoctor = {
      ...editedRow,
      department_name: selectedDepartment ? selectedDepartment.department_name : row.department_name,
    };
  
    const result = await dispatch(updateDoctor(updatedDoctor));
  
    if (result.meta.requestStatus === 'fulfilled') {
      setIsEditing(false); // Exit edit mode after successful save
      toast.success('Doctor updated successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  
      // Also update editedRow to reflect the correct department name immediately
      setEditedRow(updatedDoctor);
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
                />
                <TextField
                  size="small"
                  name="last_name"
                  value={editedRow.last_name || ''}
                  onChange={handleChange}
                  placeholder="Last Name"
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
              name="specialization"
              value={editedRow.specialization || ''}
              onChange={handleChange}
            />
          ) : (
            <p className="specialization">{row.specialization}</p>
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
            />
          ) : (
            row.contact_number
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            departmentsReady ? (
              <TextField
                select
                size="small"
                name="department_id"
                value={editedRow.department_id || ''}
                onChange={handleChange}
              >
                {departments_data?.map((dept) => (
                  <MenuItem key={dept.department_id} value={dept.department_id}>
                    {dept.department_name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField size="small" disabled value="Loading departments..." />
            )
          ) : (
            <p className="department_name">{editedRow.department_name || row.department_name}</p>
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

          <MenuItem onClick={() => handleDelete(row.doctor_id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

DoctorTableRow.propTypes = {
  row: PropTypes.shape({
    doctor_id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    contact_number: PropTypes.string.isRequired,
    department_id: PropTypes.number.isRequired,
    department_name: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};
