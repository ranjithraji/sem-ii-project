import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery'
import AddressLeft from './addressLeft/addressLeft'
import AddressLeftAdd from './addressLeftok/addressok'

function address(props) {
    const token = localStorage.usertoken;
    const [bagData, setBagData] = useState([])
    const [add, setAdd] = useState({})
    var bagprice = 0;
    var code=0;
    var count = 0;
    var offer = 0, withoutPrice = 0;
    var deliveryCharge=0;
    $('document').ready(() => {
        $('#view').click(() => {
            var btn = $('#view').html();
            if (btn === 'VIEW DETAILS') {
                $('.ok').stop().toggle(500)
                $('#view').html('HIDE DETAILS');
            }
            else {
                $('.ok').stop().toggle(500)
                $('#view').html('VIEW DETAILS');
            }
        });
    }, () => {

    })
    //get product
    if (token != '') {
        useEffect(() => {
            axios
                .post(`http://localhost:5000/bag/bagGetAll`, { token })
                .then(res => {
                    return setBagData(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [token])
    }
    //get address
    if (token != '') {
        useEffect(() => {
            axios
                .get(`http://localhost:5000/address/GetAllAddress`, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    console.log(res.data.data)
                    return setAdd(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [token])
    }

    const ok = () => {
        return bagData.map(post => {
            return (post.product.map(data => {
                bagprice = (Math.round(data.price - (data.price * (data.offers / 100))) * post.quantity) + bagprice
                offer = Math.round((data.price * (data.offers / 100)) * post.quantity) + offer
                withoutPrice = (data.price * post.quantity) + withoutPrice
                count = post.quantity + count
                if(bagprice<1500){
                    deliveryCharge=149
                }
                else{
                    deliveryCharge=0
                }
                code=data.productCode
            })
            )
        })
    }
    return (
        <div className="con1 container-fluid">
            <div className="row container desktop-base-cartLayout">
                {ok()}
                <div className="col-lg-9 col-sm-12 col-md-12 itemBlock-base-leftBlock ">
                    {(add == '') ? <AddressLeft /> : <AddressLeftAdd total={withoutPrice} offer={offer} deliveryCharge={deliveryCharge} code={code}></AddressLeftAdd>}
                </div>
                <div className="col-lg-3 col-sm-12 col-md-12 desktop-base-right">
                    <div className="priceBlock-base-container">
                        <div className="priceBlock-base-priceHeader">PRICE DETAILS ({count} Items)</div>
                        <div className="priceBreakUp-base-orderSummary" id="priceBlock">
                            <div className="priceDetail-base-row ok">
                                <span>Bag Total</span>
                                <span className="priceDetail-base-value ">
                                    <span></span>
                                    <span><i className="fa fa-inr"></i>{withoutPrice}</span>
                                </span>
                            </div>
                            <div className="priceDetail-base-row ok">
                                <span>Bag discount</span>
                                <span className="priceDetail-base-value priceDetail-base-discount">
                                    <span>-</span>

                                    <span><i className="fa fa-inr"></i>{offer}</span>
                                </span>
                            </div>
                            <div className="priceDetail-base-row">
                                <span>Order Total</span>
                                <span className="priceDetail-base-hideShow priceDetail-base-action" id='view'>VIEW DETAILS</span>
                                <span className="priceDetail-base-value ">
                                    <span></span>
                                    <span><i className="fa fa-inr"></i>{bagprice}</span>
                                </span>
                            </div>
                            <div className="priceDetail-base-row">
                                <span>Delivery Charges</span>
                                {withoutPrice >= 1500 ? (
                                    <span className="priceDetail-base-value">
                                        <span className="priceDetail-base-striked priceDetail-base-spaceRight">

                                            <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                                                <i className="fa fa-inr"></i>149</span>
                                        </span>
                                        <span className="priceDetail-base-discount">FREE</span>
                                    </span>) : (
                                        <span className="priceDetail-base-value">
                                            <span className="priceDetail-base-striked priceDetail-base-spaceRight">

                                                <span className="shippingTip-base-tipRed">
                                                    <i className="fa fa-inr"></i>149</span>
                                            </span>
                                        </span>
                                    )}
                            </div>
                            <div className="priceDetail-base-total">
                                <span>Total</span>
                                <span className="priceDetail-base-value ">
                                    <span></span>

                                    {withoutPrice >= 1500 ? (<span><i className="fa fa-inr"></i>{bagprice}</span>) : (<span><i className="fa fa-inr"></i>{bagprice + 149}</span>)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default address

