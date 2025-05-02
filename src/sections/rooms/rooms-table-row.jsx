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
import { deleteRoom, updateRoom } from '../../redux/rooms/roomRequests';

// ----------------------------------------------------------------------

export function RoomTableRow({ row, selected, onSelectRow }) {
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
      await dispatch(deleteRoom(id));
      toast.success('Room deleted successfully', {
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
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedRoom = {
      ...editedRow
    };

    const result = await dispatch(updateRoom(updatedRoom));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Room updated successfully', {
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

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="room_number"
              value={editedRow.room_number || ''}
              onChange={handleChange}
            />
          ) : (
            <p className="room_number">{row.room_number}</p>
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="room_type"
              value={editedRow.room_type || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.room_type
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="capacity"
              value={editedRow.capacity || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.capacity
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              size="small"
              name="availability_type"
              value={editedRow.availability_type || ''}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            row.availability_type
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

          <MenuItem onClick={() => handleDelete(row.room_id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

RoomTableRow.propTypes = {
  row: PropTypes.shape({
    room_id: PropTypes.number.isRequired,
    room_number: PropTypes.number.isRequired,
    room_type: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    availability_type: PropTypes.string.isRequired
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};
