import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import $ from 'jquery'

function orderRgiht(props) {
    var [oId, setOId] = useState([])
    var email = "";
    var total1 = 0;
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token)
    email = decoded.email;
    const [Ids ,setIds]=useState([])
    const [orderStatus, setOrderStatus] = useState([])
    const [orderDelete, setOrderDelete] = useState({ token: '', orderId: '' })
    // order update
    $(`#showDetail${oId}`).click(() => {
        $(`#showDetail${oId}`).hide(1000)
        $(`#hideDetail${oId}`).show(1000)
        $(`#orderDetail${oId}`).show(1000)
    })
    $(`#hideDetail${oId}`).click(() => {
        $(`#showDetail${oId}`).show(1000)
        $(`#hideDetail${oId}`).hide(1000)
        $(`#orderDetail${oId}`).hide(1000)
    })


    useEffect(() => {
        axios.put('http://localhost:5000/order/UpdateOrder', {
            ...orderStatus
        })
            .then(res => {
                if (res.data.message == 'updated successfully') {
                    alert(res.data.message)
                    window.location = 'http://localhost:3000/order/buy'
                }
                return setOrderStatus(res.data.order)
            })
            .catch(err => {
                console.log(err)
            })
    }, [orderStatus])

    // order update

    useEffect(() => {
        axios.delete('http://localhost:5000/order/DeleteOrder', {
            headers: {
                Authorization: orderDelete.token
            },
            data: { orderId: orderDelete.orderId }
        })
            .then(res => {
                if (res.data.message == 'order deleted successfully') {
                    alert(res.data.message)
                    window.location = 'http://localhost:3000/order/buy'
                }
                if (res.data.data == '') {
                    window.location = 'http://localhost:3000/Men'
                }
                return setOrderDelete(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [orderDelete])
    //total calculate
    const calD = (total, offer, deliveryCharge) => {
        total1 = (total - offer) + deliveryCharge
    }
    const cal = (total, offer) => {
        total1 = (total - offer)
    }
    const productDetail = (_id,product) => {
        
        if (_id) {
            window.location = `/order/product/${_id}/${product}`
        }
    }
    const switchSt = (data, deliveredDate, _id) => {
        switch (data) {
            case 'Ordered': return (
                <div style={{ color: '#007bff' }} className="item-status item-cancelled row">
                    <div className="col-lg-6">{data}<span> ({deliveredDate})</span></div>
                    <div className="col-lg-"></div>
                    <div className="col-lg-6" style={{ position: 'relative', left: '120px' }}>
                        <button style={{ width: '100px' }} className='btn btn-outline-primary' onClick={() => setOrderStatus({ ...orderStatus, token: token, orderId: _id, status: 'Cancelled' })}>Cancel</button>
                    </div>
                </div>)
            case 'Cancelled': return (
                <div className="item-status item-cancelled row">
                    <div className="col-lg-6">{data}<span> ({deliveredDate})</span></div>
                    <div className="col-lg-"></div>
                    <div className="col-lg-6" style={{ position: 'relative', left: '120px' }}>
                        <button style={{ width: '100px' }} className='btn btn-outline-danger' onClick={() => setOrderDelete({ ...orderDelete, token: token, orderId: _id })}>Delete</button>
                    </div>
                </div>)
            case 'Delivered': return (
                <div style={{ color: '#1cab7d' }} className="item-status item-cancelled row">
                    <div className="col-lg-6">{data}<span> ({deliveredDate})</span></div>
                    <div className="col-lg-"></div>
                    <div className="col-lg-6" style={{ position: 'relative', left: '120px' }}>
                        <button style={{ width: '100px' }} className='btn btn-outline-danger' onClick={() => setOrderDelete({ ...orderDelete, orderId: _id })}>Delete</button>
                    </div>
                </div>)
        }
    }
   
    return (
        <div>
            {props.order.map(data => (
                (<div key={data._id}>
                    <div style={{ marginTop: "20px" }}>
                        <div id={`orderDetail${data._id}`} style={{ display: 'none' }} className="orderDetail page-fullWidthComponent">
                            <div className="orderInfo-order-details">
                                <div className="orderInfo-block">
                                    <div>
                                        <span className="orderInfo-label"> Placed On: </span>
                                        <span className="orderInfo-value"> {data.orderDate}</span>
                                    </div>
                                    <div>
                                        <span className="orderInfo-label"> Order No: </span>
                                        <span className="orderInfo-value"> 123456-789123-43220{data.count}</span>
                                    </div>
                                    <div>
                                        <span className="orderInfo-label">Price Details: </span>
                                        <div className="priceBreakUp-priceBreakupExpanded">
                                            <div className="priceBreakUp-topBorder"></div>
                                            <div className="priceBreakUp-details">
                                                <div className="priceBreakUp-component">
                                                    <div>
                                                        {(data.deliveryCharge) ? calD(data.total, data.offer, data.deliveryCharge) : cal(data.total, data.offer)}
                                                        <span className="priceBreakUp-key">MRP:</span>
                                                        <span className="fa fa-inr priceBreakUp-rupeeIcon"> </span>
                                                        {data.total}
                                                    </div>
                                                    <div>
                                                        <span className="priceBreakUp-key">Item Discount:</span>
                                                        <span>(-)<span className="fa fa-inr priceBreakUp-rupeeIcon"></span>{data.offer}</span>
                                                    </div>
                                                    {!data.deliveryCharge ?
                                                        (<div>
                                                            <span className="priceBreakUp-key">Delivery Charge:</span>
                                                            <span>Free<span className="fa fa-inr priceBreakUp-rupeeIcon" style={{ texDecoration: 'line-through' }}></span>{149.00}</span>
                                                        </div>
                                                        ) : (
                                                            <div>
                                                                <span className="priceBreakUp-key">Delivery Charge:</span>
                                                                <span>(+)<span className="fa fa-inr priceBreakUp-rupeeIcon" ></span>{149.00}</span>
                                                            </div>
                                                        )}
                                                    <div>
                                                        <span className="priceBreakUp-key">Cash On Delivery:</span>
                                                        <span><span className="fa fa-inr priceBreakUp-rupeeIcon"></span>{total1}</span>
                                                    </div>
                                                    <div className="priceBreakUp-finalAmount">
                                                        <span className="priceBreakUp-key">Total:</span>
                                                        <span className="fa fa-inr priceBreakUp-rupeeIcon"></span>{total1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="orderInfo-block">
                                    <div className="orderInfo-heading">Updates sent to:</div>
                                    <div>
                                        <span className="icon-icon fa fa-mobile" style={{ fontSize: "16px", marginRight: "4px", verticalAlign: "middle", color: "rgb(83, 87, 102)" }}></span>
                                        <span>{data.address.mobile}</span>
                                    </div>
                                    <div>
                                        <span className="icon-icon fa fa-envelope-o " style={{ fontSize: "16px", marginRight: "4px", verticalAlign: "middle", color: "rgb(83, 87, 102)" }}></span>
                                        <span>{email}</span>
                                    </div>
                                </div>
                                <div className="address-address">
                                    <div className="address-shippingAddress">
                                        <div className="address-heading">Shipping Address:</div>
                                        <div style={{ fontWeight: "500" }}>{data.address.name}</div>
                                        <div>{data.address.address}</div>
                                        <div>
                                            {data.address.locality},
                                                {data.address.city} - {data.address.pinCode}<br />
                                            {data.address.state}
                                        </div>
                                    </div>
                                </div>
                                <div className="orderInfo-block">
                                    <div className="orderInfo-heading"> Payment Mode: </div>
                                    <div> {data.payment}</div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>

                        <div id={`hideDetail${data._id}`} style={{ margin: "20px 0px 5px 12px", fontSize: "15px", fontWeight: "500", display: "none" }}>
                            Items in this order
                                <span className="order-orderDetailsButton" onClick={() => setOId(data._id)}>Hide Details</span>
                        </div>
                        <div id={`showDetail${data._id}`} className="order-orderInfo " style={{ display: 'inline' }}>
                            ORDER NO:<span className="order-orderNumber">123456-789123-43220{data.count}</span>
                            <span className="order-orderDetailsButton" onClick={() => setOId(data._id)}>Show Details</span>
                        </div>
                        {data.orders.map(ord => (
                            ord.product.map(product => (
                                (<div className="item-itemContainer" key={product._id} style={{ marginTop: "20px" }}>
                                    <div id="4276158900" className="item-item">
                                        <div className="item-productInfo">
                                            <div className="item-thumbnail">
                                                <img style={{ width: "80px" }} src={product.image[0].src} />
                                            </div>
                                            <div className="item-info">
                                                <span className="item-brand">{product.productname}</span>
                                                <div className="item-productName">
                                                    {product.description}<br />
                                                    <span className="item-size">Size: {ord.productSize}</span><span> | Qty: {ord.quantity}</span>
                                                </div>
                                                <div className="item-priceInfo">
                                                    <span className="item-price">
                                                        <span className="fa fa-inr" style={{ fontSize: "12px" }}></span>&nbsp;{(data.total-data.offer)}
                                                    </span>
                                                    <span>
                                                        {switchSt(data.status, data.deliveredDate, data._id)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="item-rightArrow">
                                                <span className="icon-icon fa fa-angle-right " style={{ fontSize: "18px", fontWeight: "800", color: "rgb(148, 150, 159)", cursor: 'pointer' }} onClick={()=>{productDetail(data._id,product._id)}}></span>
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>)
                            ))))
                        }
                    </div>
                </div>)))}
        </div>

    )
}

export default orderRgiht
