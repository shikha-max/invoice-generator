import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    IconButton,
} from '@mui/material';
import { addInvoice, closeModal, deletInvoice } from '../store/invoiceReducer';
import { downloadInvoicePDF } from '../utils/appUtils';
import StatusBadge from '../components/StatusBadge';
import CustomBreadcrumbs from '../components/BreadCrum'
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const InvoiceForm = ({ dispatch, objectVal, autoFill }) => {
    const [lineItems, setLineItems] = useState(objectVal?.lineItems || [
        { description: '', quantity: 1, rate: 0 },
    ]);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [paid, setPaid] = useState(objectVal?.paid || 0);
    const [data, setData] = useState(objectVal || {});
    const [dataErr, setDataErr] = useState({});
    const [lineItemErrors, setLineItemErrors] = useState([]);
    const navigate = useNavigate();
    const linkData = [{ label: "Invoice", link: "/invoices" }]
    const handleChange = (e, tar) => {
        const value = e.target.value;
        setData((prev) => ({ ...prev, [tar]: value }));
        setDataErr((prev) => ({ ...prev, [tar]: !value.trim() }));

    };

    const handleLineItemChange = (index, field, value) => {
        const updatedItems = [...lineItems];
        updatedItems[index][field] = value;
        setLineItems(updatedItems);
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['sender', 'receiver', 'mail', 'currDate', 'terms', 'due'];

        requiredFields.forEach((key) => {
            if (!data[key] || data[key].trim() === '') {
                newErrors[key] = true;
            }
        });

        const lineErrors = lineItems.map((item) => {
            return {
                description: !item.description.trim(),
                quantity: item.quantity <= 0,
                rate: item.rate < 0,
            };
        });

        setDataErr(newErrors);
        setLineItemErrors(lineErrors);

        const hasLineErrors = lineErrors.some((item) =>
            Object.values(item).some((v) => v === true)
        );

        return Object.keys(newErrors).length === 0 && !hasLineErrors;
    };

    const onSubmit = () => {
        if (validate()) {
            const invoice = { ...data, tax, shipping, total, discount, balance: (total - paid).toFixed(2), paid, lineItems: lineItems, id: Date.now() };
            dispatch(addInvoice(invoice));
            dispatch(closeModal());
            downloadInvoicePDF()
        }
    };

    const onDelete = () =>{
        dispatch(deletInvoice(objectVal.id));
        navigate("/invoices")
    }
    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0 }]);
        setLineItemErrors([...lineItemErrors, {}]);
    };

    const calculateAmount = (quantity, rate) => quantity * rate;

    const subtotal = lineItems.reduce((acc, item) => acc + calculateAmount(item.quantity, item.rate), 0);
    const total = subtotal + shipping - discount + (subtotal * tax) / 100;
    const renderFooter = () => (
        <Box display="flex" justifyContent="flex-end" gap={2} m={2}>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#9e9e9e',
                    color: '#fff',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#7e7e7e' },
                }}
                onClick={() => dispatch(closeModal())}
            >
                Close
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={onSubmit}
                sx={{ textTransform: 'none' }}
            >
                Create
            </Button>
        </Box>
    );

    return (
        <>
            <Box id="invoice-to-pdf" sx={{ p: 4, maxHeight: '80vh', overflow: 'auto' }}>
                <CustomBreadcrumbs data={linkData} />
                {autoFill ? <><StatusBadge data={objectVal} status="pending" />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => downloadInvoicePDF()}
                        sx={{ borderRadius: 2, textTransform: 'none', ml: 2,mr:2 }}
                    >
                        Download Invoice
                    </Button>
                    <Button
                        variant="contained"
                       
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                   

                </> : null}
                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Who is this from?"
                            variant="outlined"
                            error={!!dataErr.sender}
                            helperText={dataErr.sender && 'Required'}
                            onChange={(e) => handleChange(e, 'sender')}
                            value={data.sender || ""}
                            disabled={autoFill}

                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Bill To"
                            error={!!dataErr.receiver}
                            helperText={dataErr.receiver && 'Required'}
                            onChange={(e) => handleChange(e, 'receiver')}
                            value={data.receiver || ""}
                            disabled={autoFill}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Please Provide Email Id"
                            error={!!dataErr.mail}
                            helperText={dataErr.mail && 'Required'}
                            onChange={(e) => handleChange(e, 'mail')}
                            value={data.mail || ""}
                            disabled={autoFill}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Date"
                            type="date"
                            error={!!dataErr.currDate}
                            helperText={dataErr.currDate && 'Required'}
                            onChange={(e) => handleChange(e, 'currDate')}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={data.currDate || ""}
                            disabled={autoFill}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Payment Terms"
                            value={data.terms || ""}
                            disabled={autoFill}
                            error={!!dataErr.terms}
                            helperText={dataErr.terms && 'Required'}
                            onChange={(e) => handleChange(e, 'terms')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Due Date"
                            type="date"
                            value={data.due || ""}
                            disabled={autoFill}
                            error={!!dataErr.due}
                            helperText={dataErr.due && 'Required'}
                            onChange={(e) => handleChange(e, 'due')}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1A1A40' }}>
                                <TableCell sx={{ color: 'white' }}>Item</TableCell>
                                <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                                <TableCell sx={{ color: 'white' }}>Rate</TableCell>
                                <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lineItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            disabled={autoFill}
                                            placeholder="Description"
                                            value={item?.description}
                                            onChange={(e) =>
                                                handleLineItemChange(index, 'description', e.target.value)
                                            }
                                            error={lineItemErrors[index]?.description}
                                            helperText={lineItemErrors[index]?.description && 'Required'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={item?.quantity}

                                            disabled={autoFill}
                                            onChange={(e) =>
                                                handleLineItemChange(index, 'quantity', parseInt(e.target.value) || 0)
                                            }
                                            error={lineItemErrors[index]?.quantity}
                                            helperText={lineItemErrors[index]?.quantity && 'Must be > 0'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"

                                            disabled={autoFill}
                                            value={item?.rate}
                                            onChange={(e) =>
                                                handleLineItemChange(index, 'rate', parseFloat(e.target.value) || 0)
                                            }
                                            error={lineItemErrors[index]?.rate}
                                            helperText={lineItemErrors[index]?.rate && 'Must be ≥ 0'}
                                        />
                                    </TableCell>
                                    <TableCell>Rs.{calculateAmount(item.quantity, item.rate)?.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {autoFill ? null : <Button variant="outlined" onClick={addLineItem} sx={{ mt: 2 }}>
                    + Line Item
                </Button>
                }
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={9}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            disabled={autoFill}
                            value={data?.note || ""}
                            onChange={(e) => handleChange(e, 'note')}
                            label="Notes - any relevant information not already covered"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            value={data?.condition || ""}
                            disabled={autoFill}
                            onChange={(e) => handleChange(e, 'condition')}
                            label="Terms and conditions - late fees, payment methods, etc."
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Box display="flex" justifyContent="flex-end">
                            <Stack spacing={1} sx={{ textAlign: 'right', width: '100%' }}>


                                {autoFill ? null : <><Typography
                                    disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                    Subtotal: Rs.{subtotal.toFixed(2)}
                                </Typography>
                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                        <Typography
                                            disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary' }}>Tax:</Typography>
                                        <TextField
                                            type="number"
                                            variant="standard"
                                            value={tax}
                                            disabled={autoFill}
                                            onChange={(e) => setTax(e.target.value || 0)}
                                            sx={{ ml: 1, width: 60 }}
                                            inputProps={{ min: 0 }}
                                        />
                                        <Typography
                                            disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary', ml: 1 }}>%</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                        <Typography
                                            disabled={autoFill} s sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                            Discount:{' '}
                                            {discount > 0 ? null : <Button onClick={() => setDiscount(1)}>+ Discount</Button>}

                                        </Typography>
                                        {discount > 0 ? <>
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                value={discount}
                                                disabled={autoFill}
                                                onChange={(e) => setDiscount(e.target.value || 0)}
                                                sx={{ ml: 1, width: 60 }}
                                                inputProps={{ min: 0 }}
                                            />
                                            <Typography
                                                disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary', ml: 1 }}>%</Typography>
                                        </> : null}



                                    </Box>


                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                        <Typography
                                            disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                            Shipping: {shipping > 0 ? null : <Button onClick={() => setShipping(shipping + 1)}>+ Shipping</Button>}
                                        </Typography>
                                        {shipping > 0 ? <>
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                value={shipping}
                                                disabled={autoFill}
                                                onChange={(e) => setShipping(e.target.value || 0)}
                                                sx={{ ml: 1, width: 60 }}
                                                inputProps={{ min: 0 }}
                                            />
                                            <Typography
                                                disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary', ml: 1 }}>%</Typography>
                                        </> : null}

                                    </Box> <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}
                                        disabled={autoFill}>Total: Rs.{total}</Typography></>}




                                <Box display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography
                                        disabled={autoFill} sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                        Amount Paid: Rs.
                                    </Typography>
                                    <TextField
                                        disabled={autoFill}
                                        type="number"
                                        variant="standard"
                                        value={paid}
                                        onChange={(e) => setPaid(parseFloat(e.target.value) || 0)}
                                        sx={{ ml: 1, width: 80 }}
                                        inputProps={{ min: 0 }}
                                    />
                                </Box>

                                <Typography
                                    sx={{ fontWeight: 500, color: 'text.secondary' }}
                                    disabled={autoFill} variant="h6">
                                    Balance Due: Rs.{autoFill && objectVal?.balance == 0 ? 0 : (total - paid).toFixed(2)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {autoFill ? null : renderFooter()}
        </>
    );
};

function mapStateToProps(state) {
    const { invoice } = state;
    return { invoice };
  }
  export default connect(mapStateToProps)(InvoiceForm);
