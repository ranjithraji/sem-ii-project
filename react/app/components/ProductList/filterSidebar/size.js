import React from 'react'
import PropTypes from 'prop-types'

function size(props) {
size=()=>{
    return props.size.map(data=>{
     return( <span className="product-sizeInventoryPresent" key={data}>  {data},</span>)})
}

    return (
        <h4 className="product-sizes">
            Size:{size()}
       </h4>
    )
}


export default size

