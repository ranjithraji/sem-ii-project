import React from 'react'

function offer(props) {
    if (props.price <= 1500) {
        return (
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12 shippingTip-base-deliveryTip">
                    <div className="sprite-ship-charge shippingTip-base-tipIcon"></div>
                    <div className="shippingTip-base-tipMessage">Shop for
                     <div className="shippingTip-base-minPrice">
                            <span className="shippingTip-base-tipRed"><i className="fa fa-inr"></i>{1500 - props.price}&nbsp;</span>
                        </div>more  to get
                    <span className="shippingTip-base-tipBold">&nbsp;Free Delivery.&nbsp;</span>
                    </div>

                </div>
            </div>
        )

    }
    else {
        return (
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12 shippingTip-base-deliveryTip">
                    <div className="sprite-ship-free shippingTip-base-tipIcon"></div>
                    <div className="shippingTip-base-tipMessage">Yay!
                     <div className="shippingTip-base-minPrice"></div>
                        <span className="shippingTip-base-tipBold">&nbsp;Free Delivery.&nbsp;</span>
                    on this order
                    </div>

                </div>
            </div>
        )
    }
}

export default offer

