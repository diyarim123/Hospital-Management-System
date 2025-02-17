import PropTypes from 'prop-types';
import { useState, useCallback, useContext } from 'react';

import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from '../../components/iconify';

import { deletePatient } from "../../redux/patients/patientRequests";
import { AlertContext } from '../../contexts/AlertContext';

// ----------------------------------------------------------------------


export function PatientTableRow({ row, selected, onSelectRow }) {
  const { showAlert } = useContext(AlertContext);
  const [openPopover, setOpenPopover] = useState(null);
  const dispatch = useDispatch();

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePatient(id));
      showAlert('success', 'Patient deleted successfully!');
    } catch (error) {
      console.log("err")
      showAlert('error', 'Failed to delete patient');
    }
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {`${row.first_name} ${row.last_name}`} 
          </Box>
        </TableCell>

        <TableCell> {row.date_of_birth ? new Date(row.date_of_birth).toISOString().substring(0, 10) : 'N/A'} </TableCell>

        <TableCell><p className='gender'>{row.gender}</p></TableCell>

        <TableCell align="center">
          {row.contact_number}
        </TableCell>

        <TableCell>
          {row.address}
        </TableCell>

        <TableCell>
          {row.email}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
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
          <MenuItem onClick={handleClosePopover}>
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
    avatarUrl: PropTypes.string.isRequired, 
    date_of_birth: PropTypes.string.isRequired, 
    gender: PropTypes.string.isRequired, 
    contact_number: PropTypes.string.isRequired, 
    address: PropTypes.string.isRequired, 
    email: PropTypes.string.isRequired, }).isRequired, 
    selected: PropTypes.bool.isRequired, 
    onSelectRow: PropTypes.func.isRequired,
}