import React from 'react';
import { CardImg } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


function Home(props) {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            className: 'notes-slider',
            autoplay: false,
            cssEase:'linear',
            autoplaySpeed: 1000,
            pauseOnHover: true,
        }
       function  slider(){
            return props.image.map(data=>{
              return(<div key={data.src}>
                <CardImg src={data.src} className="product-fliter-image"></CardImg>
                </div>)
            })
        }
        return (
                <div className="slick-filter">
                    <Slider {...settings}>
                        {slider()}
                    </Slider>
                </div>
        );
    }

export default Home;
