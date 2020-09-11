import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import jwt_decode from 'jwt-decode'
import OrderDetail from './OrderRight/orderRgiht'

function order(props) {
    const token = localStorage.usertoken;
    const [order, setOrder] = useState([])
    var [count ,setCount]=useState(0)
    var email = "";
    const decoded = jwt_decode(token)
    email = decoded.email;

    //get address
    if (token != '') {
        useEffect(() => {
            axios
                .get(`http://localhost:5000/order/GetAllOrder`, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    if (res.data.message != 'this is your order') {
                        return setCount(1)
                    }
                    return setOrder(res.data.order)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [token])
    }

    return (
        <div>
            {count == 0 ?
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
                                        <a href="" className="segment-activeLink segment-link"> Orders &amp; Returns</a>
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
                                    <OrderDetail order={order}></OrderDetail>
                                    < div className="pagination-pagination" > <span>Showing 1-1 of 1</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div > :
                <div>

                    <div>
                        <div className="wishlistEmpty-container">
                            <div className="wishlistEmpty-heading">YOUR ORDER IS EMPTY</div>
                            <div className="wishlistEmpty-info">
                                 Delivery truck was  ready to go with your product  So go and add the Product</div>
                            <div>
                                <img className="myntraweb-sprite wishlistEmpty-icon sprites-emptyIcon" src="https://cdn1.iconfinder.com/data/icons/transportation-1-2/24/bed-travel-transportation-empty-transport-flat-truck-512.png" />
                            </div>
                            <div>
                                <a href="http://localhost:3000/Men" className="wishlistEmpty-button">CONTINUE SHOPPING</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default order

