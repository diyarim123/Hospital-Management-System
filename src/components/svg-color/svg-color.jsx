import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { svgColorClasses } from './classes';


// ----------------------------------------------------------------------

export const SvgColor = forwardRef(({ src, width = 24, height, className, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component="span"
      className={svgColorClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        flexShrink: 0,
        height: height ?? width,
        display: 'inline-flex',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);

SvgColor.propTypes = { 
  src: PropTypes.string.isRequired, 
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
  className: PropTypes.string, 
  sx: PropTypes.objectOf(Object), 
  other: PropTypes.objectOf(Object), 
}; 
SvgColor.defaultProps = { 
  width: 24, 
  height: undefined, 
  className: '', sx: {}, other: {}
}