import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Icon, disableCache } from '@iconify/react';

import Box from '@mui/material/Box';

import { iconifyClasses } from './classes';

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ className, width = 20, sx, ...other }, ref) => (
  <Box
    ssr
    ref={ref}
    component={Icon}
    className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
    sx={{
      width,
      height: width,
      flexShrink: 0,
      display: 'inline-flex',
      ...sx,
    }}
    {...other}
  />
));

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local');

Iconify.propTypes = { 
  className: PropTypes.string, 
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
  sx: PropTypes.objectOf(Object),
}; 
Iconify.defaultProps = { 
  className: '', 
  width: 20, sx: {}
}

export default Iconify
