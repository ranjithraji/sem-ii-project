import React, { Component } from 'react';
import { Link } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            imgs: []
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/api/customers')
            .then(res => res.json())
            .then(imgs => this.setState({ imgs }));
    }
    sliders() {
        return this.state.imgs.map(data => {
            return (<div key={data.src} >
                <img className="img" src={data.src} />
            </div>)
        });
    }

    render() {
        const settings = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrow: false
        }
        //
        return (
            <div>

                <div className="slick">
                    <Slider {...settings}>
                        {this.sliders()}
                    </Slider>
                </div>
            </div>
        );
    }
}
export default Home;
