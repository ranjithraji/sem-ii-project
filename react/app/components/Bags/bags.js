import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';
import Offer from './offer/offer'

function bags(props) {
    const [Size, setSize] = useState([]);
    const token = localStorage.usertoken;
    const [bagData, setBagData] = useState([])
    const count = bagData.length;
    var bagprice = 0;
    const [product, setProduct] = useState([])
    const [productSize, setProductSize] = useState([])
    const [wish, setWish] = useState([]);
    const [wishdata, setWishData] = useState([])
    var offer = 0, withoutPrice = 0;
    const qunty = [1, 2, 3, 4, 5, 6]
    $('document').ready(() => {
        $('.offersV2-base-more').click(() => {
            var btn = $('.offersV2-base-more').html();
            if (btn == 'Show Less &nbsp;<i class="fa fa-angle-up"></i>') {
                $('.offersV2-base-more').html('Show More &nbsp;<i class="fa fa-angle-down"></i>');
                $(".offersV2-base-message:not(:first)", this).hide(500);
            }
            else {
                $('.offersV2-base-more').html('Show Less &nbsp;<i class="fa fa-angle-up"></i>');
                $(".offersV2-base-message", this).show(500);
            }
        })
    })
    //get product
    if (token != '') {
        useEffect(() => {
            axios
                .post(`http://localhost:5000/bag/bagGetAll`, { token })
                .then(res => {
                    if (res.data.data != '') {
                        return setBagData(res.data.data)
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }, [token])
    }
    else {
        return window.location = '/login'
    }
    //total calculation
    const ok = (productCode, qty) => {
        return bagData.map(post => {
            return (post.product.map(data => {
                if (data.productCode == productCode) {
                    bagprice = (Math.round(data.price - (data.price * (data.offers / 100))) * qty) + bagprice
                    offer = Math.round((data.price * (data.offers / 100)) * qty) + offer
                    withoutPrice = (data.price * qty) + withoutPrice

                }
                else {
                    bagprice = (Math.round(data.price - (data.price * (data.offers / 100))) * post.quantity) + bagprice
                    offer = Math.round((data.price * (data.offers / 100)) * post.quantity) + offer
                    withoutPrice = (data.price * post.quantity) + withoutPrice
                }
            })
            )
        })
    }
    //qty
    const qutys = (quantity) => {

        return qunty.map(data => {
            if (data == quantity) {
                return (
                    <option value={data} key={data}>{data}</option>)
            }
            else {
                return (
                    <option value={data} key={data}>{data}</option>)
            }
        })
    }
    //delete bag

    // if ((productSize.token != '' || productSize.token != undefined)) {
    useEffect(() => {
        axios
            .delete(`http://localhost:5000/bag/bagDelete`, {
                headers: {
                    Authorization: productSize.token
                },
                data: productSize
            })
            .then(res => {
                alert(res.data.message)
                window.location = 'http://localhost:3000/bag/buy'
            })
            .catch(err => {
                console.log(err)
            })
    }, [productSize])
    //  }
    //get size and store dropdown
    const size = (size, proSize) => {
        return (size.map((size, index) => {
            if (proSize === size) {
                return (<option key={index} value={size}>{size}</option>)
            }
            else {
                return (<option key={index} value={size}>{size}</option>)
            }
        })
        )

    }
    //update cart
    // if (product.token!='') {
    useEffect(() => {
        axios.put(`http://localhost:5000/bag/bagUpdate`, {
            ...product
        }).then(res => {
                return setBagData(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, [product])
    //}

    //finial update
    //  if (Size.productSize!='') {
    useEffect(() => {
        axios.put(`http://localhost:5000/bag/bagUpdate`, {
            ...Size
        }).then(res => {
            if (res.data.message == 'this is your bag') {
                window.location = "/bag/buy"
                return setBagData(res.data.data)
            }
        })
            .catch(err => {
                console.log(err)
            })
    }, [Size])
    // }
    //wishlist
    useEffect(() => {
        axios
            .post(`http://localhost:5000/wish/moveBag`, { ...wish })
            .then(res => {
                if (res.data.message == 'wishlist created successfully') {
                    alert(res.data.message)
                    window.location = 'http://localhost:3000/bag/buy'
                    return setWishData(res.data.data)
                }
                else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }, [wish])
    //product get function
    const productGet = (product, productSize, _id, quantity) => {

        return product.map(data => {

            return (
                <div className=" row item-base-item" key={data}>
                    <div className="col-lg-12 col-sm-12 col-md-12    itemContainer-base-item ">
                        <div className="itemContainer-base-itemLeft">
                            <a href=''>
                                <div >
                                    <img className="bag-img" src={data.image[0].src} alt="img" />
                                </div>
                            </a>
                        </div>
                        <div className="itemContainer-base-itemRight">
                            <div className="itemContainer-base-details">
                                <div>
                                    <div className="itemContainer-base-brand">{data.productname}</div>
                                    <a className="itemContainer-base-itemLink" href="/">{data.description}</a>
                                </div>
                                <div className="itemComponents-base-sellerData">Sold by:{data.by}</div>
                                <div className="row itemContainer-base-sizeAndQty">
                                    <div className="col-lg-5 col-sm-12 col-md-12 itemComponents-base-size">
                                        Size:<select className="select-cart-size" value={productSize} name='productSize' id="size" onChange={async (e) => { await setSize({ [e.target.name]: e.target.value, _id: _id, token: token, quantity: quantity }); }}>
                                            {size(data.size, productSize)}
                                        </select>
                                    </div>
                                    <div className="col-lg-5  col-sm-12 col-md-12 itemComponents-base-quantity">
                                        Qty:<select className="select-cart-size" value={quantity} id="qty" onChange={async (e) => { setProduct({ quantity: Number(e.target.value), _id: _id, token: token }) }} >
                                            {qutys(quantity)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="itemComponents-base-price itemComponents-base-bold itemContainer-base-amount">
                                        <div>
                                            <i className="fa fa-inr"></i> {Math.round(data.price - (data.price * (data.offers / 100)))}
                                        </div>
                                    </div>
                                    <div className="itemContainer-base-discountStrikedAmount">
                                        <span className="itemComponents-base-strikedAmount">
                                            <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                                                <i className="fa fa-inr"></i>{data.price}
                                            </span>
                                        </span>&nbsp;
                                        <span className="itemComponents-base-itemDiscount">{data.offers}% OFF</span>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                        <div className="inlinebuttonV2-base-actions ">
                            <div className="inlinebuttonV2-base-action itemContainer-base-itemActions">
                                <button className="inlinebuttonV2-base-actionButton itemContainer-base-inlineButton removeButton" onClick={() => { setProductSize({ ...productSize, product: data._id, _id: _id, token: token }) }}>Remove</button>
                            </div>
                            <div className="inlinebuttonV2-base-action itemContainer-base-itemActions">
                                <button className="inlinebuttonV2-base-actionButton itemContainer-base-inlineButton  wishlistButton" onClick={async () => { setWish({ ...wish, _id: _id, product: data._id, token: token }) }}>Move to WishList</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            {count != 0 ?
                <div className="con1 container-fluid">
                    <div className="row ">
                        <div className="col-12 headerComponents-base-ufp">Prices are inclusive of all taxes</div>
                    </div>
                    <div className="row container desktop-base-cartLayout">
                        <div className="col-lg-9 col-sm-12 col-md-12 itemBlock-base-leftBlock ">
                            <div className="row ">
                                <div className="col-lg-12 col-sm-12 col-md-12 offersV2-base-container">
                                    <div className="offersV2-base-title">  <span><img className="offersV2-icon" src="https://www.flaticon.com/premium-icon/icons/svg/1146/1146571.svg"></img></span> Available Offers</div>
                                    <div>
                                        <li className="offersV2-base-message ">
                                            <span>10% Instant Discount on Kotak Credit and Debit Cards on a min spend of Rs 3000. TCA</span>
                                        </li>
                                        <li className="offersV2-base-message">
                                            <span>50% Cashback Voucher of up to Rs 500 on first ever PayPal transaction. TCA</span>
                                        </li>
                                        <li className="offersV2-base-message ">
                                            <span>10% SuperCash up to Rs 200 when you pay with MobiKwik wallet. TCA</span>
                                        </li>
                                        <li className="offersV2-base-message ">
                                            <span>10% Cashback upto Rs 200 on PayZapp. TCA</span>
                                        </li>
                                        <div className="offersV2-base-more">Show More &nbsp;<i className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                                {ok(product.productCode, product.quantity)}
                            </div>
                            <Offer price={withoutPrice}></Offer>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12 itemBlock-base-itemHeader">
                                    <div>My Shopping Bag ({count} Items)</div>
                                    <div className="itemBlock-base-totalCartValue">Total:
                            <i className="fa fa-inr"></i> {bagprice}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12  itemContainer-base-itemMargin">
                                    {bagData.map(post => {
                                        return (
                                            <div key={post.productSize}>
                                                {productGet(post.product, post.productSize, post._id, post.quantity)}

                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-md-12 desktop-base-right">
                            <div>
                                <div>
                                    <div>
                                        <div className="coupons-base-header">Coupons</div>
                                        <div className="coupons-base-content">
                                            <span className="coupons-base-couponIcon fa fa-tag"></span>
                                            <div className="coupons-base-label ">Apply Coupons</div>
                                            <div>
                                                <button className="coupons-base-button">APPLY</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="priceBlock-base-container">
                                <div className="priceBlock-base-priceHeader">PRICE DETAILS</div>
                                <div className="priceBreakUp-base-orderSummary" id="priceBlock">
                                    <div className="priceDetail-base-row">
                                        <span>Bag Total</span>
                                        <span className="priceDetail-base-value ">
                                            <span></span>

                                            <span><i className="fa fa-inr"></i>{withoutPrice}</span>
                                        </span>
                                    </div>
                                    <div className="priceDetail-base-row">
                                        <span>Bag discount</span>
                                        <span className="priceDetail-base-value priceDetail-base-discount">
                                            <span>-</span>

                                            <span><i className="fa fa-inr"></i>{offer}</span>
                                        </span>
                                    </div>
                                    <div className="priceDetail-base-row">
                                        <span>Coupon Discount</span>
                                        <span className="priceDetail-base-value priceDetail-base-action">Apply Coupon</span>
                                    </div>
                                    <div className="priceDetail-base-row">
                                        <span>Order Total</span>
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
                            <div>
                                <a href="/address/add">
                                    <div className="button-base-button ">Place Order</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>

                    <div>
                        <div className="wishlistEmpty-container">
                            <div className="wishlistEmpty-heading">YOUR BAG IS EMPTY</div>
                            <div className="wishlistEmpty-info">
                                Add items to your Bag then only Order your product So go and get some item.</div>
                            <div>
                                <img className="myntraweb-sprite wishlistEmpty-icon sprites-emptyIcon" src="https://img.icons8.com/carbon-copy/2x/shopping-cart-promotion.png" />
                            </div>
                            <div>
                                <a href="http://localhost:3000/Men" className="wishlistEmpty-button">CONTINUE SHOPPING</a>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}



export default bags


