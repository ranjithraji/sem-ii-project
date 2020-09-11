import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class Example extends React.Component {
  constructor(){
    super()
    this.state={
      card:[]
    }
  }
  componentDidMount() {
    fetch('http://localhost:5000/ga/cardGet')
  .then(res => res.json())
  .then(card => this.setState({card}));
  }
  Card(){
    return this.state.card.map(data => {
        return (  <div key={data.cardSrc} className="col-lg-3 col-sm-12 col-md-6">
        <Card>
          <a href={data.route} className="gallaryCard">
          <CardBody>
              <CardImg className="cardImg" src={data.cardSrc} alt="Card image cap" />
          </CardBody>
          </a>
        </Card>
      </div>)
    });
}
  render(){
    return (
      <div>
        <img className="image-image undefined " src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2019/3/27/6c96d800-d9af-4459-81b7-c95e8345a95a1553683205533-Influencer-Section.jpg" srcSet=""></img>
      <div className="row cona">
        {this.Card()}
      </div>
      </div>
   )
  }
};

export default Example;