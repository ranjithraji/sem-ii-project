import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';
import Home from '../filterSidebar/sidebar';
import Size from '../filterSidebar/size';

function filterContent(props) {

  return (
    <div className="row">
      {props.product.map(post => (
        <div key={post.productCode} className="col-lg-3 col-sm-12 col-md-6" style={{ height: '300px',marginBottom:'60px' }}>
          <a href={`/Men/${post.productname}/${post.brand}/${post.productCode}`}>
          <Card className="card-fliter">
            <CardBody className="fliter-card-body">
              <Home image={post.image}>
              </Home>
            </CardBody>
            <CardFooter className="filter-card-footer">
              <h3 className="product-brand">{post.brand}</h3>
              <h4 className="product-product">{post.productname}</h4>
              <div className="product-actions">
                <span className="product-actionsButton product-addToBag">
                  <span>Add to bag</span>
                </span>
                <span className="product-actionsButton product-wishlist ">
                  wishlist
              	</span>
              </div>
              <Size size={post.size}></Size>
              <div className="product-price">
                <span>
                  <span className="product-discountedPrice"><b>{Math.round(post.price - (post.price * (post.offers / 100)))}</b></span>
                  <span className="product-strike">
                    {post.price}
                  </span>
                </span>
                <span className="product-discountPercentage">({post.offers}% OFF)</span>
              </div>
            </CardFooter>
          </Card>
          </a>
        </div>
      ))}
    </div>
  )
}

export default filterContent

