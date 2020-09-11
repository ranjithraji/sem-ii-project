import React, { Component } from 'react';
import Navbar from '../../components/Navbar/navbar';
//import Slick_k from '../../components/slickSlider/slick';
import Slick_k from '../../components/slickSlider/customers'
import Footer from '../../components/footer/footer'
import UpdateProfile from '../../components/ExitProfile/updatePro.js/profileEdit'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../../components/profile/LoginCard/Login'
import FirstLogin from '../../components/profile/LoginCard/FirstLogin'
import Register from '../../components/profile/RegisterCard/Register'
import ShowProfile from '../../components/ExitProfile/ShowEditedPro/showEditProfile'
import Gallary from '../../components/Gallary/GalleryCard'
import Filter from '../../components/ProductList/filter'
import Product from '../../components/Product/product'
import Bags from'../../components/Bags/bags'
import BagNavbar from '../../components/Navbar/cartNavbar/cartNavbar'
import Address from '../../components/address/address'
import Order from '../../components/Order/order'
import OrderProduct from '../../components/Order/OrderPage/orderpage'
import WishList from '../../components/wishlist/wishlist'
class Homepage extends React.Component {
   
    constructor(){
        super();
        this.state={
            cart:'/bag/buy',
            address:'/address/add'
        }
    }
    render() {
        return (
            <div>
                {(this.state.cart===window.location.pathname)||(this.state.address===window.location.pathname) ?
                <BagNavbar/>
              :
              <Navbar/>
              
              }
                <Switch>
                    <Router>
                        <br />
                        <Route exact path='/'>
                            <Slick_k />
                            <Gallary />
                        </Route>
                        <Route exact path="/register" ><Register /></Route>
                        <Route exact path="/login" ><Login /></Route>
                        <Route exact path="/Firstlogin" ><FirstLogin/></Route>
                        <Route exact path="/showProfile" ><ShowProfile /></Route>
                        <Route exact path='/UpdateProfile'> <UpdateProfile /></Route>
                        <Route exact path='/Men'> <Filter /></Route>
                        <Route exact path='/Women'> <Filter /></Route>
                        <Route exact path='/Kids'> <Filter /></Route>
                        <Route exact path='/Discover'> <Filter /></Route>
                        <Route exact path='/HomeLiving'> <Filter /></Route>
                        <Route exact path='/Product'><Product /></Route>
                        <Route exact path='/Men/:productname/:brand/:productCode'><Product /></Route>
                        <Route exact path='/bag/buy'><Bags /></Route>
                        <Route exact path='/order/buy'><Order/></Route>
                        <Route exact path='/address/add'><Address /></Route>
                        <Route exact path='/order/product/:_id/:product'><OrderProduct/></Route>
                        <Route exact path='/wish/love'><WishList/></Route>
                    </Router>
                </Switch>
                <Footer />
            </div>
        )
    }
}
export default Homepage;
