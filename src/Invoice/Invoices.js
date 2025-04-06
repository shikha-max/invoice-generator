import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardContent, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Stack, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { invoiceData } from '../constants/inputConstant';
import { addInvoice, addInvoices, deletInvoice } from '../store/invoiceReducer';
import { OpenInvoice } from '../utils/appUtils';
import DeleteIcon from '@mui/icons-material/Delete';

function Invoices({ dispatch, invoice }) {

  const navigate = useNavigate();
 
  const onCreateClick = (e,id) => {

    dispatch(OpenInvoice())
  }

  const handleDelete =(e,id) =>{
    e.stopPropagation()
    dispatch(deletInvoice(id))
  }
  useEffect(() => {
    dispatch(addInvoices(invoiceData))
  }, [])
  return <>
    <Card sx={{ boxShadow: 2, borderRadius: 2 }}>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ backgroundColor: '#fff', p: 1.5, borderRadius: 2, boxShadow: 1,  }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onCreateClick()}
          sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
        >
          Create Invoice
        </Button>


      </Box>
      <Box sx={{p:2}}>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1A1A40' }}>
            <TableCell sx={{ color: 'white' }}>Receiver</TableCell>
            <TableCell sx={{ color: 'white' }}>Invoice Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Amount Paid</TableCell>
            <TableCell sx={{ color: 'white' }}>Amount Pending</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(invoice.invoiceList).map(([key, value], index) => (
            <TableRow sx={{cursor:'pointer'}} onClick={()=> {
              navigate(`/invoices/${value.id}`)
            
              
            }} key={index}>
              <TableCell>
                <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant="body2">
                  {value.receiver}
                </Typography>
              </TableCell>

              <TableCell>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant="body2">
                  {value.currDate}
                </Typography>
              </TableCell>

              <TableCell>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant="body2">
                  {value.due}
                </Typography>
              </TableCell>

              <TableCell>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant="body2">
                  {value.paid}
                </Typography>
              </TableCell>

              <TableCell>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant="body2">
                  {value.balance}
                </Typography>
              </TableCell>

            <TableCell>
            <StatusBadge data={value} />
            </TableCell>
              <TableCell>
                <IconButton color="error" onClick={(e)=>handleDelete(e,value.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Box>
    </Card>

   
  </>
}

function mapStateToProps(state) {
  const { invoice } = state;
  return { invoice };
}
export default connect(mapStateToProps)(Invoices);