import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { numberToWords } from 'number-to-words';

function InvoiceDetailsComponent() {
    const { orderNo } = useParams();
    const [invoiceDetail, setInvoiceDetail] = useState(null);
    const [amountInWords, setAmountInWords] = useState('');

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/invoices/${orderNo}`);
                setInvoiceDetail(response.data);
                setAmountInWords(numberToWords.toWords(response.data.totalAmount));
            } catch (error) {
                console.error('Error fetching invoice details:', error);
            }
        };

        fetchInvoiceDetails();
    }, [orderNo]);

    if (!invoiceDetail) {
        return <div>Loading...</div>;
    }

    const {
        sellerDetails,
        billingDetails,
        shippingDetails,
        items,
        totalAmount,
        placeOfSupply,
        placeOfDelivery,
        orderDetails,
        signature,
        invoiceDetails,
        reverseCharge
    } = invoiceDetail;

    const signatureImg = signature.split('uploads/')[1];

    const downloadHtml = () => {
        const invoiceContent = document.getElementById('invoice-content').innerHTML;

        const blob = new Blob([invoiceContent], { type: 'text/html' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'invoice.html';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }


    return (
        <div className="container mx-auto my-5 md:px-10" id="invoice-content" style={{ margin: '0 auto' }}>
            <div className="p-6 border-[1px] rounded-lg shadow-lg border-gray-300">
                <div style={{ textAlign: 'right' }} className='mb-7'>
                    <h2 className='font-bold' >Tax Invoice/Bill of Supply/Cash Memo</h2>
                    <p>(Original for Recipient)</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h3 className='font-bold'>Sold By :</h3>
                        <p>{sellerDetails.name}</p>
                        <p>{sellerDetails.address}</p>
                        <p>{sellerDetails.city}, {sellerDetails.state} - {sellerDetails.pincode}</p>
                        <p><span className='font-bold'>PAN: </span>{sellerDetails.panNo}</p>
                        <p><span className='font-bold'>GST Registration No: </span> {sellerDetails.gstNo}</p>
                    </div>
                    <div className='text-right'>
                        <div className='mb-3'>
                            <h3 className='font-bold'>Billing Address :</h3>
                            <p>{billingDetails.name}</p>
                            <p>{billingDetails.address}</p>
                            <p>{billingDetails.city}, {billingDetails.state} - {billingDetails.pincode}</p>
                            <p><span className='font-bold'>State/UT Code : </span>{billingDetails.stateCode}</p>
                        </div>

                        <div className='mb-3'>
                            <h3 className='font-bold'>Shipping Address :</h3>
                            <p>{shippingDetails.name}</p>
                            <p>{shippingDetails.address}</p>
                            <p>{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}</p>
                            <p><span className='font-bold'>State/UT Code : </span>{shippingDetails.stateCode}</p>
                            <p><span className='font-bold'>Place of Supply : </span>{placeOfSupply}</p>
                            <p><span className='font-bold'>Place of Delivery : </span>{placeOfDelivery}</p>
                        </div>



                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p><span className='font-bold'>Order No : </span> {orderDetails.orderNo}</p>
                        <p><span className='font-bold'>Order Date : </span>
                        {new Date(orderDetails.orderDate).toLocaleDateString()}
                         </p>
                    </div>
                    <div>
                        <p><span className='font-bold text-right'>Invoice No : </span> {invoiceDetails.invoiceNo}</p>
                        <p><span className='font-bold text-right'>Invoice Date : </span> 
                        {new Date(invoiceDetails.invoiceDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <table className='my-2 border-collapse border border-gray-400 w-full'>
                    <thead className='text-left'>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-400 px-4 py-2'>Sr <br /> No</th>
                            <th className='border border-gray-400 px-4 py-2'>Description</th>
                            <th className='border border-gray-400 px-4 py-2'>Unit <br />Price</th>
                            <th className='border border-gray-400 px-4 py-2'>Quantity</th>
                            <th className='border border-gray-400 px-4 py-2'>Discount</th>
                            <th className='border border-gray-400 px-4 py-2'>Tax <br />Rate</th>
                            <th className='border border-gray-400 px-4 py-2'>Tax <br />Type</th>
                            <th className='border border-gray-400 px-4 py-2'>Tax <br />Amount</th>
                            <th className='border border-gray-400 px-4 py-2'>Total <br />Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className='border border-gray-400 px-4 py-2'>{index + 1}</td>
                                <td className='border border-gray-400 px-4 py-2'>{item.description}</td>
                                <td className='border border-gray-400 px-4 py-2'>{item.unitPrice}</td>
                                <td className='border border-gray-400 px-4 py-2'>{item.quantity}</td>
                                <td className='border border-gray-400 px-4 py-2'>{item.discount}</td>
                                <td className='border border-gray-400 px-4 py-2'>
                                    {item.igstAmount > 0 && `${item.gstRate}%`}
                                    {item.cgstAmount > 0 && `${item.gstRate / 2}%`}
                                    {item.sgstAmount > 0 && `${item.gstRate / 2}%`}
                                </td>
                                <td className='border border-gray-400 px-4 py-2'>
                                    {item.cgstAmount > 0 && 'CGST'}
                                    {item.sgstAmount > 0 && 'SGST'}
                                    {item.igstAmount > 0 && 'IGST'}
                                </td>
                                <td className='border border-gray-400 px-4 py-2'>
                                    {item.igstAmount > 0 && `₹ ${item.igstAmount}`}
                                    {item.cgstAmount > 0 && `₹ ${item.cgstAmount}`}
                                    {item.sgstAmount > 0 && `₹ ${item.sgstAmount}`}
                                </td>
                                <td className='border border-gray-400 px-4 py-2'>
                                    {`₹ ${item.netAmount + item.igstAmount + item.cgstAmount + item.sgstAmount}`}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className='border border-gray-400 px-4 py-2 font-bold' colSpan="8">Total Amount :</td>

                            <td className='border border-gray-400 px-4 py-2 font-bold' colSpan="1">₹ {totalAmount}</td>

                        </tr>
                        <tr>
                            <td className='border border-gray-400 px-4 py-2 font-bold' colSpan="9">Amount in Words: {amountInWords} only</td>
                        </tr>
                        <tr>
                            <td className='border border-gray-400 px-4 py-2 font-bold' colSpan="9">
                                {signature && (
                                    <div className='flex justify-end'>
                                        <div className='flex flex-col'>
                                        <h3 className='font-bold'>For {sellerDetails.name}</h3>
                                        <img src={`http://localhost:3000/api/invoices/signature/${signatureImg}`} alt="Signature" style={{ maxHeight: '50px', maxWidth: '100px' }} />
                                        <h3 className='font-bold'>Authorized Signatory</h3>
                                        </div>
                                        
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className='text-[15px]'>Whether tax is payable under reverse charge - {reverseCharge ? 'Yes' : 'No'}</p>

            </div>
            <button onClick={downloadHtml} className='my-4 py-2 px-4 bg-slate-900 text-white rounded-md'>Download Invoice</button>

        </div>
    );
}

export default InvoiceDetailsComponent;
