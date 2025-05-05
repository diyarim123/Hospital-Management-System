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
import ModalUnstyled from '../billings_modal';

import { TableNoData } from '../table-no-data';
import { BillingTableRow } from '../billings-table-row';
import { BillingTableHead } from '../billings-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { BillingTableToolbar } from '../billings-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { getBillings } from '../../../redux/billings/billingRequests';

// js pdf imports
import { exportBillingsToPDF } from '../../../utils/pdfExport';

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

export function BillingsView({ handleModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const { billings_loading, billings_data, billings_err } = useSelector((state) => state.billings);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getBillings());
  }, [dispatch]);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: billings_data || [],
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }),
    [billings_data, table, filterName]
  );

  const Modal = isOpen ? <ModalUnstyled isOpen={isOpen} /> : null;
  const notFound = !dataFiltered.length && !!filterName;

  const handleRetry = () => {
    dispatch(getBillings());
  };

  const handleExportPDF = () => {
    exportBillingsToPDF(dataFiltered);
  };

  return (
    <DashboardContent>
      {billings_err ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography color="error" align="center" variant="h6">
            {billings_err}
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
              Billings
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleModal}
            >
              New Bill
            </Button>
          </Box>

          <Card>
            <BillingTableToolbar
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
                  <BillingTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={billings_data?.length || 0}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(checked, billings_data?.map((user) => user.id) || [])
                    }
                    headLabel={[
                      { id: 'patient_name', label: 'Patient' },
                      { id: 'amount', label: "Amount"},
                      { id: 'payment_status', label: 'Payment Status'},
                      { id: 'bill_date', label: 'Bill Date' }
                    ]}
                  />
                  <TableBody>
                    {billings_loading ? (
                      <TableNoData />
                    ) : (
                      dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <BillingTableRow
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
                        billings_data?.length || 0
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
              count={billings_data?.length || 0}
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

BillingsView.propTypes = {
  handleModal: PropTypes.func,
};
