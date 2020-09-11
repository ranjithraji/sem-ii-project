import React from 'react'
import {Card,CardImg} from 'reactstrap';

function productcard(props) {
   function card(){
        return props.image.map(data=>{
            return(
                <div className="col-lg-6 col-md-12 col-sm-12 productpage-card-con" key={data.src}>
                    <Card className="productpage-card">
                       <CardImg className="productpage-card-image" src={data.src}></CardImg>
                    </Card>
                </div>
            )
        })
    }

    return (
        <div className="row">
           {card()}
        </div>
    )
}

export default productcard
