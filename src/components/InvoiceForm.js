import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Box, Container, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

const steps = ['Seller Details', 'Billing & Shipping Details', 'Item Details', 'Additional Details'];

function InvoiceForm() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        sellerName: '',
        sellerAddress: '',
        sellerCity: '',
        sellerState: '',
        sellerPincode: '',
        sellerPAN: '',
        sellerGST: '',
        placeOfSupply: '',
        billingName: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingPincode: '',
        billingStateCode: '',
        shippingName: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingPincode: '',
        shippingStateCode: '',
        placeOfDelivery: '',
        orderDate: '',
        invoiceDate: '',
        reverseCharge: false,
        items: [{ description: '', unitPrice: '', quantity: '', discount: '', gstRate: '' }], 
    });
    const [orderNumber, setOrderNumber] = useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    

    const handleItemChange = (e, index, field) => {
        const newItems = [...formData.items];
        if (!newItems[index]) {
            newItems[index] = {}; 
        }
        newItems[index][field] = e.target.value;
        setFormData({ ...formData, items: newItems });
    };
    
    
    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: '', unitPrice: '', quantity: '', discount: '', gstRate: '' }]
        });
    };
    

    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const signatureData = reader.result.split(',')[1]; 
            setFormData({ ...formData, signature: signatureData });
        };
    
        reader.readAsDataURL(file); 
    };
    
    const removeItem = (index) => {
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        setFormData({ ...formData, items: newItems });
    };
    
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <>
                    <Grid container spacing={2} className='flex'>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={formData.sellerName}
                                onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={formData.sellerAddress}
                                onChange={(e) => setFormData({ ...formData, sellerAddress: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="City"
                                value={formData.sellerCity}
                                onChange={(e) => setFormData({ ...formData, sellerCity: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="State"
                                value={formData.sellerState}
                                onChange={(e) => setFormData({ ...formData, sellerState: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Pincode"
                                value={formData.sellerPincode}
                                onChange={(e) => setFormData({ ...formData, sellerPincode: e.target.value })}
                                required
                                inputProps={{ pattern: "\\d{0,6}" }}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="PAN No."
                                value={formData.sellerPAN}
                                onChange={(e) => setFormData({ ...formData, sellerPAN: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="GST Registration No."
                                value={formData.sellerGST}
                                onChange={(e) => setFormData({ ...formData, sellerGST: e.target.value })}
                                required
                            />
                        </Grid>
                    </Grid>
                    <hr className='h-[2px] my-3 bg-slate-300'/>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Place of Supply"
                            value={formData.placeOfSupply}
                            onChange={(e) => setFormData({ ...formData, placeOfSupply: e.target.value })}
                        />
                    </Grid>
                    </>
                );
                case 1:
                    return (
                        <>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={formData.billingName}
                                    onChange={(e) => setFormData({ ...formData, billingName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    value={formData.billingAddress}
                                    onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    value={formData.billingCity}
                                    onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    value={formData.billingState}
                                    onChange={(e) => setFormData({ ...formData, billingState: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    value={formData.billingPincode}
                                    onChange={(e) => setFormData({ ...formData, billingPincode: e.target.value })}
                                    inputProps={{ pattern: "\\d{0,6}" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="State/UT Code"
                                    value={formData.billingStateCode}
                                    onChange={(e) => setFormData({ ...formData, billingStateCode: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={formData.sameBillingShipping}
                                        onChange={(e) => {
                                            setFormData({ 
                                                ...formData, 
                                                sameBillingShipping: e.target.checked,
                                            });
                                            if (e.target.checked) {
                                                setFormData({ 
                                                    ...formData, 
                                                    shippingName: formData.billingName,
                                                    shippingAddress: formData.billingAddress,
                                                    shippingCity: formData.billingCity,
                                                    shippingState: formData.billingState,
                                                    shippingPincode: formData.billingPincode,
                                                    shippingStateCode: formData.billingStateCode,
                                                });
                                            }
                                        }}
                                    />}
                                    label="Is Billing and Shipping Details Same?"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={formData.shippingName}
                                    onChange={(e) => setFormData({ ...formData, shippingName: e.target.value })}
                                    disabled={formData.sameBillingShipping}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    value={formData.shippingAddress}
                                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                                    disabled={formData.sameBillingShipping}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    value={formData.shippingCity}
                                    onChange={(e) => setFormData({ ...formData, shippingCity: e.target.value })}
                                    disabled={formData.sameBillingShipping}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    value={formData.shippingState}
                                    onChange={(e) => setFormData({ ...formData, shippingState: e.target.value })}
                                    disabled={formData.sameBillingShipping}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    value={formData.shippingPincode}
                                    onChange={(e) => setFormData({ ...formData, shippingPincode: e.target.value })}
                                    disabled={formData.sameBillingShipping}
                                    inputProps={{ pattern: "\\d{0,6}" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="State/UT Code"
                                    value={formData.shippingStateCode}
                                    onChange={(e) => setFormData({ ...formData, shippingStateCode: e.target.value })}
                                    disabled={formData.sameBillingShipping}
                                />
                            </Grid>
                        </Grid>
                        <hr className='h-[2px] my-3 bg-slate-300'/>
                        <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Place of Delivery"
                                    value={formData.placeOfDelivery}
                                    onChange={(e) => setFormData({ ...formData, placeOfDelivery: e.target.value })}
                                />
                            </Grid>
                            </>
                    );
                
                
                    case 2:
                        return (
                            <div>
                                {formData.items.map((item, index) => (
                                    <div key={index}>
                                        <h6 className='my-1 text-[25px]'>Item {index+1}</h6>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Description"
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(e, index, 'description')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Unit Price"
                                                    value={item.unitPrice}
                                                    onChange={(e) => handleItemChange(e, index, 'unitPrice')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(e, index, 'quantity')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Discount %"
                                                    value={item.discount}
                                                    onChange={(e) => handleItemChange(e, index, 'discount')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="GST Rate %"
                                                    value={item.gstRate}
                                                    onChange={(e) => handleItemChange(e, index, 'gstRate')}
                                                />
                                            </Grid>

                                        </Grid>
                                        <button onClick={() => removeItem(index)} className='p-1 rounded-sm bg-red-500 my-2 hover:bg-red-400'><FiTrash2 className='text-white  text-[20px]'/></button>
                                    </div>
                                ))}
                                <button onClick={addItem} className='flex gap-2 text-white text-[17px] p-2 rounded-sm bg-blue-600 hover:bg-blue-400'><MdAdd className='text-[20px]'/> Add Item</button>
                            </div>
                        );
                    
                case 3:
                    return (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Order Date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split('T')[0]} 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formData.orderDate}
                                    onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Invoice Date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split('T')[0]} 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formData.invoiceDate}
                                    onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Reverse Charge</InputLabel>
                                    <Select
                                        value={formData.reverseCharge}
                                        onChange={(e) => setFormData({ ...formData, reverseCharge: e.target.value })}
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <hr className='h-[2px] my-3 bg-slate-300'/>

                            <Grid item xs={12} sm={6}>
                               <h6 className='text-[20px]'>Signature</h6>
                                <TextField
    fullWidth
    type="file"
    accept=".png, .jpg, .jpeg"
    onChange={handleSignatureChange} 
    inputProps={{ capture: 'environment' }}
/>
<p className='text-[13px] text-red-600 mt-2'>* Only png/jpg/jpeg files allowed</p>

                            </Grid>
                        </Grid>
                    );
                
            default:
                return null;
        }
    }
    
    const handleSubmit = () => {
        const dataToSend = {
            sellerDetails: {
                name: formData.sellerName,
                address: formData.sellerAddress,
                city: formData.sellerCity,
                state: formData.sellerState,
                pincode: formData.sellerPincode,
                panNo: formData.sellerPAN,
                gstNo: formData.sellerGST,
            },
            placeOfSupply: formData.placeOfSupply,
            billingDetails: {
                name: formData.billingName,
                address: formData.billingAddress,
                city: formData.billingCity,
                state: formData.billingState,
                pincode: formData.billingPincode,
                stateCode: formData.billingStateCode,
            },
            shippingDetails: {
                name: formData.shippingName,
                address: formData.shippingAddress,
                city: formData.shippingCity,
                state: formData.shippingState,
                pincode: formData.shippingPincode,
                stateCode: formData.shippingStateCode,
            },
            placeOfDelivery: formData.placeOfDelivery,
            invoiceDetails: {
                invoiceDate: formData.invoiceDate,
            },
            reverseCharge: formData.reverseCharge,
            signature: formData.signature,
            items: formData.items,
        };
        
        console.log("Data being sent:", dataToSend);
    
        axios.post('http://localhost:3000/api/invoices/create', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data);
                const generatedOrderNumber = response.data.orderDetails.orderNo;
                console.log(generatedOrderNumber)
                setOrderNumber(generatedOrderNumber);
                navigate(`/invoice-details/${generatedOrderNumber}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    
    

    return (
<div className="container mx-auto py-5 md:px-20">
            <div className="p-6 border-[1px] rounded-lg shadow-lg border-gray-300">
                            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <Typography variant="h5" gutterBottom>
                        {getStepContent(activeStep)}
                    </Typography>
                </Box>
                <Box className='flex justify-between mt-5'>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    {activeStep === steps.length - 1 ?
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button> :
                        <Button variant="contained" onClick={handleNext}>Next</Button>
                    }
                </Box>
            </Box>
        </div>
        </div>
    );
}

export default InvoiceForm;
