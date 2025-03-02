import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { varAlpha } from '../../theme/styles';

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify';

// ----------------------------------------------------------------------

export function WorkspacesPopover({ data = [], sx, ...other }) {
  const [workspace, setWorkspace] = useState(data[0]);
  const { user, token} = useSelector(state => state.auth);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeWorkspace = useCallback(
    (newValue) => {
      setWorkspace(newValue);
      handleClosePopover();
    },
    [handleClosePopover]
  );

  const renderAvatar = (alt, src) => (
    <Box component="img" alt={alt} src={src} sx={{ width: 24, height: 24, borderRadius: '50%' }} />
  );

  const renderLabel = (role) => (
    <Label color={role === 'Admin' ? 'default' : 'info'}>{role}</Label>
  );

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={handleOpenPopover}
        sx={{
          pl: 2,
          py: 3,
          gap: 1.5,
          pr: 1.5,
          width: 1,
          borderRadius: 1.5,
          textAlign: 'left',
          justifyContent: 'flex-start',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          ...sx,
        }}
        {...other}
      >
        {renderAvatar(workspace?.name, workspace?.logo)}

        <Box
          gap={1}
          flexGrow={1}
          display="flex"
          alignItems="center"
          sx={{ typography: 'body2', fontWeight: 'fontWeightSemiBold' }}
        >
          {user?.username}
          {renderLabel(user?.role)}
        </Box>

        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
      </ButtonBase>

      <Popover open={!!openPopover} anchorEl={openPopover} onClose={handleClosePopover}>
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 260,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              p: 1.5,
              gap: 1.5,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === workspace?.id}
              onClick={() => handleChangeWorkspace(option)}
            >
              {renderAvatar(user.username, option.logo)}

              <Box component="span" sx={{ flexGrow: 1 }}>
                {option.name}
              </Box>

              {renderLabel(user.role)}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}

WorkspacesPopover.propTypes = {
  data: PropTypes.arrayOf(Array),
  sx: PropTypes.objectOf(Object)
}