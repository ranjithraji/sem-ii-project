import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router";
import ProductImg from './productCard/productcard'
import $ from 'jquery'

const productPage = props => {
    const token=localStorage.usertoken
    let { productCode } = useParams();
    const [product, setProduct] = useState([]);
    const [id, setId] = useState([]);
    const [sizedata, setSizeData] = useState();
    const [wish ,setWish]=useState([]);
    const [wishdata ,setWishData]=useState([])
    // const [message, setMessage] = useState([]);
    $('.size-buttons-size-button-selected').removeClass('size-buttons-size-button size-buttons-size-button-default size-buttons-size-button-selected').addClass('size-buttons-size-button size-buttons-size-button-default')
    $('#' + id.productSize).removeClass('size-buttons-size-button size-buttons-size-button-default').addClass('size-buttons-size-button size-buttons-size-button-default size-buttons-size-button-selected')

    //product get
    useEffect(() => {
        axios
            .get(`http://localhost:5000/pro/productPage/${productCode}`)
            .then(res => {
                return setProduct(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [productCode])

    //add to bag
    useEffect(() => {
        axios.post(`http://localhost:5000/bag/bagCreate`, { ...id })
            .then(res => {
                alert(res.data.message)
                return setSizeData(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])
    //wishlist
    useEffect(()=>{
        axios
            .post(`http://localhost:5000/wish/wishlistCreate`,{...wish})
            .then(res => {
                if(res.data.message=='wishlist created successfully'){
                  alert(res.data.message)
                    return setWishData(res.data.data)
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    },[wish])
    
    function bag() {
        if (id.productSize != undefined) {
            const token = localStorage.usertoken;
            if (token == undefined || token == '') {
                return window.location = '/login'
            }
            else {
                    $('#add_to_cart').hide(100);
                    $('#go_to_Back').show(100);
            }
        }
        else {
            alert("Select product size")
        }
        if (sizedata) {
            alert(sizedata)
        }
    }

    const goToBack = () => {
        if (sizedata) {
            return window.location = '/bag/buy'
        }
    }

    function size(size) {
        return size.map(data => {
            return (<div className="size-buttons-tipAndBtnContainer" key={data}>
                <div className="size-buttons-buttonContainer">
                    <button className='size-buttons-size-button size-buttons-size-button-default' name="size" id={data} value={data} onClick={() => { setId({ ...id, productSize: data }) }}>
                        <span className="size-buttons-size-strike-hide"></span>
                        <p className="size-buttons-unified-size">
                            {data}
                        </p>
                    </button>
                    <span className="size-buttons-inventory-left-hidden size-buttons-inventory-left">Hide</span>
                </div>
            </div>)
        })
    }


    return (


        <div className="con container-fluid">
            {product.map(data => {
                return (
                    <div className="row" key={data.productCode}>
                        <div className='col-lg-7 col-sm-12 col-md-10'>
                            <ProductImg image={data.image}></ProductImg>
                        </div>
                        <div style={{ paddingLeft: '2%' }} className='col-lg-5 col-sm-12 col-md-10'>
                            <div className='row'>
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <h1 className='product-title'>{data.productname}</h1>
                                    <h1 className='product-name'>{data.description}</h1>
                                    <p className="product-discount-container">
                                        <span className="product-price">
                                            <strong>Rs.{Math.round(data.price - (data.price * (data.offers / 100)))}</strong>
                                        </span>
                                        <span className="product-mrp">
                                            <s>Rs.{data.price}</s>
                                        </span>
                                        <span className="product-discount">({data.offers}% OFF)</span>
                                    </p>
                                    <p className="product-selling-price">
                                        <span className="product-vatInfo">inclusive of all taxes</span>
                                    </p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <br></br>
                                    <div className="size-buttons-size-header">
                                        <h4 className="size-buttons-select-size">SELECT SIZE</h4>
                                    </div>
                                    <div className="size-buttons-size-buttons ">
                                        {size(data.size)}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-lg-6 col-sm-12 col-md-10">
                                    <button type="button" name="bag" id="add_to_cart" className="porduct-button-bag" onClick={async () => { await setId({ ...id, productname: data.productname, product: data._id, token: localStorage.usertoken }), await bag() }}>
                                        <span className="product-button-inner fa fa-shopping-bag"></span>
                                        ADD TO BAG
                                    </button>
                                    <button type="button" id="go_to_Back" style={{ display: 'none' }} name="bag" onClick={goToBack} className="porduct-button-bag" >
                                        <span className="product-button-inner fa fa-arrow-right"></span>
                                        GO TO BAG
                                    </button>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-md-10">
                                    <button type="button" name="wishlist" className="product-button-wishlist" onClick={async ()=>{setWish({...id,token:token,product:data._id})}}>
                                        <span className="product-button-inner  fa fa-bookmark"></span>
                                        WISHLIST
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <div className="pdp-offers-container">
                                        <h5>
                                            BEST OFFERS
                                        <span className="myntraweb-sprite pdp-offers-similarColorsIcon fa fa-tag"></span>
                                        </h5>
                                        <div>
                                            <div className="pdp-offers-offerBlock">
                                                <div className="pdp-offers-offer">
                                                    <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                        This product is already at its best price
                                                </div>
                                                    <br />
                                                    <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                        <h6>EMI option available</h6>
                                                        &nbsp;&nbsp; EMI start from Rs.120/month
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pdp-productDescriptors">
                                        <br />
                                        <h5>
                                            PRODUCT DETAILS
                                             <span className="myntraweb-sprite pdp-offers-similarColorsIcon fa fa-list-alt"></span>
                                        </h5>
                                        <br />
                                        <div className="pdp-offers-offerBlock">
                                            <div className="pdp-offers-offer">
                                                <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                    {data.description}
                                                </div>
                                            </div>
                                            <div className="pdp-offers-offer">
                                                <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                    <h6>Material &amp; Care</h6>
                                                    &nbsp;Cotton<br />Machine-wash.
                                                </div>
                                            </div>
                                            <br />
                                            <div className="pdp-offers-offer">
                                                <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                    <h6>Specifications</h6>
                                                    <div className="index-tableContainer">
                                                        <div className="index-row">
                                                            <div className="index-rowKey">PRODUCT NAME</div>
                                                            <div className="index-rowValue">{data.productname}</div>
                                                        </div>
                                                        <div className="index-row">
                                                            <div className="index-rowKey">BRAND</div>
                                                            <div className="index-rowValue">{data.brand}</div>
                                                        </div>
                                                        <div className="index-row">
                                                            <div className="index-rowKey">TYPE</div>
                                                            <div className="index-rowValue">{data.productType}</div>
                                                        </div>
                                                        <div className="index-row">
                                                            <div className="index-rowKey">COLOR</div>
                                                            <div className="index-rowValue">{data.color}</div>
                                                        </div>
                                                        <div className="index-row">
                                                            <div className="index-rowKey">SOLD BY</div>
                                                            <div className="index-rowValue">{data.by}</div>
                                                        </div>
                                                        <div className="index-row">
                                                            <div className="index-rowKey">PRODUCT CODE</div>
                                                            <div className="index-rowValue">{data.productCode}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pdp-productDescriptors">
                                        <br />
                                        <h5>
                                            DELIVERY OPTIONS
                                             <span className="myntraweb-sprite pdp-offers-similarColorsIcon fa fa-truck"></span>
                                        </h5>
                                        <br />
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                100% Original Products
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                Free Delivery on order above Rs. {data.price}<br />
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                Cash on delivery might be available
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                Easy 30 days returns and exchanges
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                Try &amp; Buy might be available
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                Product Code: <b>{data.productCode}</b>
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                Sold by: <b>{data.by}</b> ( Supplied By Partner )
                                            </div>
                                        </div>
                                        <div className="pdp-offers-offer">
                                            <div className="pdp-offers-offerTitle pdp-offers-couponNotFound">
                                                View Supplier Information
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}


export default productPage

