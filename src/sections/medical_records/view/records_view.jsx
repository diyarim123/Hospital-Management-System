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
import ModalUnstyled from '../records_modal';

import { TableNoData } from '../table-no-data';
import { RecordTableRow } from '../records-table-row';
import { RecordTableHead } from '../records-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { RecordTableToolbar } from '../records-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { getMedicals } from '../../../redux/medical_records/medicalRequests';

// js pdf imports
import { exportRecordsToPDF } from '../../../utils/pdfExport';

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

export function RecordsView({ handleModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const { medicals_loading, medicals_data, medicals_err } = useSelector((state) => state.medicals);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: medicals_data || [],
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }),
    [medicals_data, table, filterName]
  );

  const Modal = isOpen ? <ModalUnstyled isOpen={isOpen} /> : null;
  const notFound = !dataFiltered.length && !!filterName;

  const handleRetry = () => {
    dispatch(getMedicals());
  };

  const handleExportPDF = () => {
    exportRecordsToPDF(dataFiltered);
  };

  return (
    <DashboardContent>
      {medicals_err ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography color="error" align="center" variant="h6">
            {medicals_err}
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
              Records
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleModal}
            >
              New Record
            </Button>
          </Box>

          <Card>
            <RecordTableToolbar
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
                  <RecordTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={medicals_data?.length || 0}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(checked, medicals_data?.map((user) => user.id) || [])
                    }
                    headLabel={[
                      { id: 'patient_name', label: 'Patient' },
                      {id: 'doctor_name', label: 'Doctor'},
                      { id: 'diagnosis', label: 'Diagnosis' },
                      { id: 'treatment', label: 'Treatment' },
                      { id: 'prescription', label: 'Prescription' },
                      { id: 'record_date', label: 'Record Date'}
                    ]}
                  />
                  <TableBody>
                    {medicals_loading ? (
                      <TableNoData />
                    ) : (
                      dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <RecordTableRow
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
                        medicals_data?.length || 0
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
              count={medicals_data?.length || 0}
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

RecordsView.propTypes = {
  handleModal: PropTypes.func,
};
