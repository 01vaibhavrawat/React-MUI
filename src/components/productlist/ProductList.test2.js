import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { getAllProducts, deleteProduct } from '../../api/assetstore';
import Loader from '../loader/loader';
import NoData from '../noData/NoData';
import { edit } from '../../redux/productSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Delete from '../delete/Delete';
import { error, success } from '../../App';
import Modal from '@mui/material/Modal';
import TableHeader from '../tableHeader/TableHeader';
import Breadcrumb from '../breadcrumbs/Breadcrumbs';

const headCells = [
  {
    numeric: false,
    disablePadding: true,
    label: 'Product Name',
  },
  {
    numeric: true,
    disablePadding: false,
    label: 'Id',
  },
  {
    numeric: true,
    disablePadding: false,
    label: 'Sell price',
  },
  {
    numeric: true,
    disablePadding: false,
    label: 'MRP',
  },
  {
    numeric: true,
    disablePadding: false,
    label: 'Primary Image',
  },
];

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead >
  );
}

export default function Users() {

  const [deleteRowId, setDeleteRowId] = React.useState(0);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [data, setData] = React.useState([]);

  const [showLoader, setShowLoader] = React.useState(true);

  const loadAllProducts = () => {
    setShowLoader(true);
    getAllProducts().then((res) => {
      setData(JSON.parse(res).result);
      setNoData(false);
    })
      .catch((err) => {
        setNoData(true);
      })
      .then(() => {
        setShowLoader(false);
      })
  }

  React.useEffect(() => {
    loadAllProducts();
  }, [])

  const rows = data;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [open2, setOpen2] = React.useState(false);
  const handleModalOpen2 = () => {
    setOpen2(true);
  };
  const handleModalClose2 = () => {
    setOpen2(false);
    loadAllProducts();
  };

  const [noData, setNoData] = React.useState(false)

  const deleteFunction = () => {
    handleModalOpen2();
    deleteProduct(deleteRowId).then(res => {
      success('Successfully deleted Product.')
      handleModalClose2();
      loadAllProducts();
    }).catch(err => {
      error();
    })
  }

  return (
    <React.Fragment>

      <Breadcrumb parent="Products" />
      <Modal
        open={open2}
        onClose={handleModalClose2}
      ><div id="delete-modal"><Delete deleteFunction={deleteFunction} close={handleModalClose2} /></div></Modal>

      {showLoader && <Loader />}

      <div id="prod-table">
        <Box sx={{ width: '100%' }}>
          {noData ? <NoData /> : <div id="table-body">
            <Paper sx={{ width: '100%', mb: 2 }}>

              <TableHeader handleModalOpen={() => { }} parent='Products' />

              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  size="small"
                >
                  <EnhancedTableHead
                    rowCount={rows && rows.length}
                  />
                  <TableBody id="table-body">
                    {rows && rows.sort()
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        const StyledTableCell = styled(TableCell)(({ theme }) => ({
                          [`&.${tableCellClasses.head}`]: {
                            backgroundColor: theme.palette.common.black,
                            color: theme.palette.common.white,
                          },
                          [`&.${tableCellClasses.body}`]: {
                            fontSize: 14,
                          },
                        }));

                        const StyledTableRow = styled(TableRow)(({ theme }) => ({
                          '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.action.hover,
                          },
                          // hide last border
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }))

                        return (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.rowId}
                          >
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.productName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.rowId}</StyledTableCell>
                            <StyledTableCell align="right">{row.sellPrice}</StyledTableCell>
                            <StyledTableCell align="right">{row.mrp}</StyledTableCell>
                            <StyledTableCell align="right">{Array.isArray(row.imageUrls) ? row.imageUrls.length : 0 && <img id="table-image" src={row.imageUrls[0].imageUrl} height={35} width={50} alt='primary' />}</StyledTableCell>
                            <StyledTableCell align="right" ><EditIcon onClick={() => {
                              dispatch(edit(row));
                              console.log('onclick')
                              navigate("/dashboard/addProduct");
                            }
                            } /></StyledTableCell>
                            <StyledTableCell align="right"><DeleteIcon onClick={() => {
                              setDeleteRowId(row.rowId);
                              handleModalOpen2();
                            }} /></StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (33) * emptyRows,
                        }}
                      >

                        <EnhancedTableHead
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {rows.sort
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={row.rowId}
                                >
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.calories}</TableCell>
                                  <TableCell align="right">{row.fat}</TableCell>
                                  <TableCell align="right">{row.carbs}</TableCell>
                                  <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: (33) * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows && rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>

          </div>}
        </Box>
      </div>
    </React.Fragment >
  );
}
