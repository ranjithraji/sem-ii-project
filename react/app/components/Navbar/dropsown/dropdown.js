
import React,{useState} from 'react';
import ProfileDrop from './profileDropDown';
import ProfileLogin from'./ProfileLogin';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import {getProfile}  from '../../profile/UserFunctions';
function ModalExample(props){

const user=getProfile.user;
     if(!localStorage.usertoken){
      return(<div><ProfileDrop/></div>);
     }
     else{
      return (<div><ProfileLogin/></div>);
     }
   
}

export default ModalExample;