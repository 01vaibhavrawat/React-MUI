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
import Modal from '@mui/material/Modal';
import AddBanner from "../addBanner/AddBanner";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { deleteBanner, getAllBanners } from '../../api/assetstore';
import Loader from '../loader/loader';
import NoData from '../noData/NoData';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { editBanner } from '../../redux/bannerSlice';
import Delete from '../delete/Delete';
import { error, success } from '../../App';
import TableHeader from '../tableHeader/TableHeader';
import Breadcrumb from '../breadcrumbs/Breadcrumbs';


const headCells = [
  {
    disablePadding: true,
    label: 'Row Id',
  },
  {
    disablePadding: false,
    label: 'Image URL',
  },
  {
    disablePadding: false,
    label: 'Link URL',
  },
  {
    disablePadding: false,
    label: 'Position priority',
  },
  {
    disablePadding: false,
    label: 'View',
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



export default function Users() {

  const [deleteRowId, setDeleteRowId] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();

  const [data, setData] = React.useState([]);

  let rows = data;

  const [showLoader, setShowLoader] = React.useState(true);

  const loadAllBanners = () => {
    setShowLoader(true);
    getAllBanners().then(function (res) {
      setData(res.result);
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
    loadAllBanners();
  }, [])

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

  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
    loadAllBanners();
  };

  const [open2, setOpen2] = React.useState(false);
  const handleModalOpen2 = () => {
    setOpen2(true);
  };
  const handleModalClose2 = () => {
    setOpen2(false);
    loadAllBanners();
  };

  const [noData, setNoData] = React.useState(false);

  const deleteFunction = () => {
    handleModalOpen2();
    deleteBanner(deleteRowId).then(res => {
      success('Successfully deleted banner.')
      handleModalClose2();
      loadAllBanners();
    }).catch(err => {
      error();
    })
  }


  return (
    <React.Fragment>
      <Breadcrumb parent="Banners" />
      {showLoader && <Loader />}
      <Modal
        open={open}
        onClose={handleModalClose}
      ><div id="add-user-modal"><AddBanner close={handleModalClose} /></div></Modal>

      <Modal
        open={open2}
        onClose={handleModalClose2}
      >
        <div id="delete-modal">
          <Delete deleteFunction={deleteFunction} close={handleModalClose2} /></div>
      </Modal>

      {noData ? <NoData /> : <div id="prod-table">

        <Box sx={{ width: '100%' }}>
          <div id="table-body">
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableHeader handleModalOpen={handleModalOpen} parent='Banners' />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  size="small"
                >
                  <EnhancedTableHead
                    rowCount={rows.length}
                  />
                  <TableBody id="table-body">
                    {rows.sort()
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
                              {row.rowId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.linkUrl ? row.linkUrl : "-"}</StyledTableCell>
                            <StyledTableCell align="right">{row.imageUrl ? row.imageUrl : "-"}</StyledTableCell>
                            <StyledTableCell align="right">{row.positionPriority}</StyledTableCell>
                            <StyledTableCell align="right">{row.view}</StyledTableCell><StyledTableCell align="right" ><EditIcon onClick={() => {
                              handleModalOpen();
                              dispatch(editBanner(row));
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
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Box>
      </div>}
    </React.Fragment>
  );
}
