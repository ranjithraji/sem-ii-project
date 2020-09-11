import React,{Component} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import sliders from './img';

class Home extends Component {
    constructor() {
        super();
        this.state={
            sliders
        };
}

 sliders(){
    return this.state.sliders.map(data => {
        return ( <div key={data.src} >
            <img alt="image" className="img" src={data.src} />
        </div>)
    });
 }

  render() {
      const settings = {
          dots: true,
          autoplay: true,
          autoplaySpeed: 1000
      }
      return (
          <div className="slick">
              <Slider {...settings}>
                  {this.sliders()}
              </Slider>
          </div>
      );
  }
}
export default Home;
