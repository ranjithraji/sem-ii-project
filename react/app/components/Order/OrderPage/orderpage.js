import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router";
import jwt_decode from 'jwt-decode'

function orderpage() {
    let { _id, product } = useParams();
    // const [products, setProducts] = useState([])
    const [order, setOrder] = useState([])
    const token = localStorage.usertoken
    var email = "";
    var total1 = 0;
    const decoded = jwt_decode(token)
    email = decoded.email;

    useEffect(() => {
        axios.post(`http://localhost:5000/order/getOrder/${_id}/${product}`, { token })
            .then(res => {
                if (res.data.message == "this is your order") {
                    // setProducts(res.data.product)
                    setOrder(res.data.order)
                }
                else {
                    window.location = 'http://localhost:3000/Men'
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [token])
        //total calculate
        const calD = (total, offer, deliveryCharge) => {
            total1 = (total - offer) + deliveryCharge
        }
        const cal = (total, offer) => {
            total1 = (total - offer)
        }
    return (

        <div className="con1 container-fluid" >
            <div className="application-base full-height">
                <div className="page-page">
                    <div className="account-account">
                        <div className="account-heading"> Account</div>
                        <div>{email}</div>
                    </div>
                    <div className="row">
                        <div className="sidebar-sidebar col-lg-2">
                            <div className="segment-segment">
                                <div className=""></div>
                                <a href="" className="segment-link">Overview</a>
                            </div>
                            <div className="segment-segment">
                                <div className="segment-heading">ORDERS</div>
                                <a href="http://localhost:3000/order/buy" className="segment-activeLink segment-link"> Orders &amp; Returns</a>
                            </div>
                            <div className="segment-segment">
                                <div className="segment-heading">CREDITS</div>
                                <a href="" className="segment-link">Coupons</a>
                                <a href="" className="segment-link"> Myntra Credit</a>
                                <a href="" className="segment-link">Myntra Points</a>
                            </div>
                            <div className="segment-segment">
                                <div className="segment-heading">ACCOUNT</div>
                                <a href="" className="segment-link"> Profile</a>
                                <a href="" className="segment-link">Saved Cards</a>
                                <a href="" className="segment-link">Addresses </a>
                                <a href="" className="segment-link"> Myntra Insider</a>
                            </div>
                        </div>
                        <div className="order-order col-lg-8">
                            {order.map(data => (
                                (data.orders.map(ord => (
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
                                                        {/* {switchSt(data.status, data.deliveredDate, data._id)} */}
                                                    </div>
                                                    
                                                </div>
                                                <div></div>
                                            </div>
                                        </div>)
                                    )))))))
                            }
                            < div className="pagination-pagination" > <span>Showing 1-1 of 1</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default orderpage
