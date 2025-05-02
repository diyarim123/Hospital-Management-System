import { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useSelector, useDispatch } from 'react-redux';

import { Iconify } from '../../../components/iconify';
import { Scrollbar } from '../../../components/scrollbar';
import { DashboardContent } from '../../../layouts/dashboard';
import ModalUnstyled from '../rooms-modal';

import { TableNoData } from '../table-no-data';
import { RoomTableRow } from '../rooms-table-row';
import { RoomTableHead } from '../rooms-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { RoomTableToolbar } from '../rooms-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { getRooms } from '../../../redux/rooms/roomRequests';

// js pdf imports
import { exportRoomsToPDF } from '../../../utils/pdfExport';

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('first_name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');

  const onSort = useCallback(
    (columnId) => {
      const isAsc = orderBy === columnId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(columnId);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked, newSelecteds) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

// ----------------------------------------------------------------------

export function RoomsView({ handleModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const { rooms_loading, rooms_data, rooms_err } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: rooms_data || [],
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }),
    [rooms_data, table, filterName]
  );

  const Modal = isOpen ? <ModalUnstyled isOpen={isOpen} /> : null;
  const notFound = !dataFiltered.length && !!filterName;

  const handleRetry = () => {
    dispatch(getRooms());
  };

  const handleExportPDF = () => {
    exportRoomsToPDF(dataFiltered);
  };

  return (
    <DashboardContent>
      {rooms_err ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography color="error" align="center" variant="h6">
            {rooms_err}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRetry}
            style={{ marginTop: '16px' }}
          >
            Retry
          </Button>
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
              Rooms
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleModal}
            >
              New Room
            </Button>
          </Box>

          <Card>
            <RoomTableToolbar
              numSelected={table.selected.length}
              filterName={filterName}
              onFilterName={(event) => {
                setFilterName(event.target.value);
                table.onResetPage();
              }}
            />

            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <RoomTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={rooms_data?.length || 0}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(checked, rooms_data?.map((user) => user.id) || [])
                    }
                    headLabel={[
                      { id: 'room_number', label: 'Room Number' },
                      { id: 'room_type', label: 'Room Type' },
                      { id: 'capacity', label: 'Capacity' },
                      { id: 'availability_type', label: 'Availability' }
                    ]}
                  />
                  <TableBody>
                    {rooms_loading ? (
                      <TableNoData />
                    ) : (
                      dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <RoomTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                          />
                        ))
                    )}

                    <TableEmptyRows
                      height={68}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        rooms_data?.length || 0
                      )}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              page={table.page}
              count={rooms_data?.length || 0}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        </>
      )}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Iconify icon="mdi:file-pdf-box" />}
        onClick={handleExportPDF}
        sx={{
          ml: 2, // margin-left
          mt: 3, // margin-top to separate from the table
          width: '180px', // custom width
          alignSelf: 'flex-end', // push to right side if inside a flex container
        }}
      >
        Export PDF
      </Button>
    </DashboardContent>
  );
}

RoomsView.propTypes = {
  handleModal: PropTypes.func,
};
