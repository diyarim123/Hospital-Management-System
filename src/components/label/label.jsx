import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { StyledLabel } from './styles';
import { labelClasses } from './classes';

// ----------------------------------------------------------------------

export function sentenceCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Label = forwardRef(({
  children, color = 'default', variant = 'soft', startIcon, endIcon, sx, className, ...other
}, ref) => {
  const theme = useTheme();

  const iconStyles = {
    width: 16,
    height: 16,
    '& svg, img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };

  return (
    <StyledLabel
      ref={ref}
      component="span"
      className={labelClasses.root.concat(className ? ` ${className}` : '')}
      ownerState={{ color, variant }}
      sx={{ ...(startIcon && { paddingLeft: 0.75 }), ...(endIcon && { paddingRight: 0.75 }), ...sx }}
      theme={theme}
      {...other}
    >
      {startIcon && (
        <Box component="span" className={labelClasses.icon} sx={{ marginRight: 0.75, ...iconStyles }}>
          {startIcon}
        </Box>
      )}

      {typeof children === 'string' ? sentenceCase(children) : children}

      {endIcon && (
        <Box component="span" className={labelClasses.icon} sx={{ marginLeft: 0.75, ...iconStyles }}>
          {endIcon}
        </Box>
      )}
    </StyledLabel>
  );
});


Label.propTypes = { 
  children: PropTypes.node, 
  color: PropTypes.string, 
  variant: PropTypes.string, 
  startIcon: PropTypes.node, 
  endIcon: PropTypes.node, 
  sx: PropTypes.objectOf(Object),
  className: PropTypes.string, 
}; 
Label.defaultProps = { 
  color: 'default', 
  variant: 'soft', 
  sx: {}, 
  className: '',
}
// ----------------------------------------------------------------------
