import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export function TableEmptyRows({ emptyRows, height, sx, ...other }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
        ...sx,
      }}
      {...other}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number.isRequired,
  height: PropTypes.number,
  sx: PropTypes.objectOf(Object),
};
