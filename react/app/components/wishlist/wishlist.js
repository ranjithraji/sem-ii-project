import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import $ from 'jquery'

function wishlist(props) {
    const token = localStorage.usertoken
    const [wishData, setWishdata] = useState([])
    const [Id, setId] = useState([])
    const [del, setDel] = useState([])
    var wishitem = wishData.length
    //get data
    useEffect(() => {
        Axios.post(`http://localhost:5000/wish/getAllWishlist`, { token })
            .then(res => {
                if (res.data.data != '') {
                    return setWishdata(res.data.data)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [token])
    //add to bag
    useEffect(() => {
        Axios.post(`http://localhost:5000/wish/moveToBag`, { ...Id })
            .then(res => {
                if (res.data.message == "product already added in your bag successfully") {
                    window.location = "http://localhost:3000/bag/buy"
                    alert(res.data.message)
                }
                else {
                    if (res.data.message == "product added in your bag successfully") {
                        window.location = "http://localhost:3000/bag/buy"
                        alert(res.data.message)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [Id])
    //get data
    useEffect(() => {
        Axios.delete(`http://localhost:5000/wish/deleteWishlist`, {
            headers: {
                Authorization: token
            },
            data: { wishId: del.wishId }
        })
            .then(res => {
                if (res.data.message == "wishlist deleted successfully") {
                    window.location = "http://localhost:3000/wish/love"
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [del])

    const size = (size, wishId, product) => {
        return size.map(data => {
            return (
                <button key={data} className="sizeselect-sizeButton" name="size" id={data} value={data} onClick={() => { setId({ ...Id, productSize: data, product: product, wishId: wishId, token: token }) }}>{data}</button>
            )
        })
    }

    //change class
    $('document').ready(() => {
        $('#moveToBag').click(() => {
            $('#sizeup').removeClass('sizeselect-sizeDisplayDiv')
            $('#sizeup').addClass('sizeselect-sizeDisplayDiv1')
        })
    })
    $('.sizeselect-sizeButton-selected').removeClass('sizeselect-sizeButton-selected').addClass('sizeselect-sizeButton')
    $('#' + Id.productSize).removeClass('sizeselect-sizeButton').addClass('sizeselect-sizeButton-selected')


    return (
        <div >
            {(wishitem != 0) ?
                <div className="con1 container-fluid ">
                    <div className="row ">
                        <div className="col-12 headerComponents-base-ufp">Prices are inclusive of all taxes</div>
                    </div>
                    <div className="index-desktop">
                        <div className="index-headingDiv">
                            <span className="index-heading">My Wishlist </span>
                            <span className="index-count index-heading" style={{ fontWeight: '400' }}>{wishitem} item</span>
                        </div>
                        <div className=" row">
                            {wishData.map(data => (
                                (data.product.map(product =>
                                    (<div key={data._id} className="col-lg-3">
                                        <div id="item0" className="itemcard-itemCard">
                                            <div className="itemcard-itemImageDiv">
                                                <a href="/" target="_blank">
                                                    <img className="itemcard-itemImage" src={product.image[0].src} />
                                                </a>
                                                <div className="itemcard-removeIcon" onClick={() => setDel({ ...del, wishId: data._id, token: token })}>
                                                    <span className="myntraweb-sprite fa fa-times" style={{ position: 'relative' }}></span>
                                                </div>
                                                <div className="itemcard-shim"></div>
                                            </div>
                                            <div id="sizeup" className="sizeselect-sizeDisplayDiv">
                                                <div className="sizeselect-sizeDisplayHeader">
                                                    <span className="sizeselect-sizeSelectLabel">Select a size</span>
                                                    <span className="myntraweb-sprite sizeselect-sizeDisplayRemoveMark sprites-remove"></span>
                                                </div>
                                                <div className="sizeselect-sizeButtonsContaier">
                                                    {size(product.size, data._id, product._id)}
                                                </div>
                                            </div>
                                            <div className="itemcard-itemActions">
                                                <div className="itemdetails-itemDetails">
                                                    <p className="itemdetails-itemDetailsLabel">{product.productname}</p>
                                                    <p className="itemdetails-itemDetailsDescription"></p>
                                                    <div className="itemdetails-itemPricing">
                                                        <span className="itemdetails-boldFont">
                                                            Rs.{Math.round(product.price - (product.price * (product.offers / 100)))}
                                                        </span>
                                                        <span className="itemdetails-strike">
                                                            {product.price}
                                                        </span>
                                                        <span className="itemdetails-discountPercent">
                                                            ({product.offers}% OFF)
                                                </span>
                                                    </div>
                                                </div>
                                                <div className="itemcard-actionDiv">
                                                    <span className="itemcard-flex ">
                                                        <a className="itemcard-moveToBag itemcard-boldFont" id="moveToBag" >MOVE TO BAG</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                ))))}
                        </div>
                    </div>
                </div>
                :<div>

                       <div>
                           <div className="wishlistEmpty-container">
                               <div className="wishlistEmpty-heading">YOUR WISHLIST IS EMPTY</div>
                               <div className="wishlistEmpty-info">
                                   Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</div>
                                   <div>
                                        <img  className="myntraweb-sprite wishlistEmpty-icon sprites-emptyIcon" src="https://www.pngrepo.com/download/271788/cry-emoji.png"/>
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


export default wishlist

