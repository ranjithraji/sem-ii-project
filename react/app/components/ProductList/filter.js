import React, { useState, useEffect } from 'react'
import { Form, Collapse, Modal, Input, Container } from 'reactstrap';
import Content from './filterContent/filterContent'
import axios from 'axios';
import $ from 'jquery'

function sidebar(props) {
  const [show, showCount] = useState(false);
  const [show1, showCount1] = useState(false);
  const [show2, showCount2] = useState(false);
  const [show3, showCount3] = useState(false);
  const [product, setProduct] = useState([])
  const [pro,setPro]=useState([])
  function onChange(e){
     setPro({...pro,[e.target.name]:e.target.value})

   } 

  if (pro.color == '' || pro.size == ''||pro.brand ==''||pro.price=='') {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/pro/productGet`)
        .then(res => {
          return setProduct(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },[])
  }
  else {
    useEffect(() => {
      axios
        .post(`http://localhost:5000/pro/productFind`,{...pro})
        .then(res => {
           return setProduct(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },[pro])
  }
  function restart(){
    setPro([]);
  }
  //jquery 
  $('document').ready(()=>{
    $('.header-clearAllBtn').click(()=>{
      $('input[type="radio"]').prop('checked', false);
    });
    if(pro=='')
    {
      $('.header-clearAllBtn').hide(1000)
    }
    else{
      $('.header-clearAllBtn').show(1000)
    }
  })

  return (
    <div className="con">
      <Container fluid='true' className="filter-container">
        <div className='row'>
          <div className="filter-side-con col-lg-2 col-sm-2 col-md-3">
          <div className="row ">
              <div className="col-12 vertical-filters-filters header-container">
                <span className="header-title">Fliter</span>
                <a className="header-clearAllBtn" onClick={restart}>CLEAR ALL</a>
              </div>
          </div>
            <div className="row filter-side-con-in">
              <div className="col-12 filter-side-con-in">
                <button type="button" className="filter-header btn" onClick={() => showCount(!show)}>
                  <span >COlOR</span>
                  <i className="fa fa-chevron-down filter-header-inner" aria-hidden="true"></i>
                </button>
                <Collapse isOpen={show}>
                  <div className="filter-inner2">
                    <Input type="radio" name="color" className="" value={'BLACK'} onChange={onChange} /><span >BLACK</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="color" className="" value={"YELLOW"} onChange={onChange} /><span style={{ color: '#ffd402' }}>YELLOW</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="color" className="" value={"BLUE"} onChange={onChange} /><span style={{ color: '#042fff' }}>BLUE</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="color" className="" value={"RED"} onChange={onChange} /><span style={{ color: '#f70b21' }}>RED</span>
                  </div>
                </Collapse>
              </div>
            </div>
            <div className="row filter-side-con-in">
                   <div className="col-12 filter-side-con-in">
                   <button type="button" className="filter-header btn" onClick={() => showCount1(!show1)}>
                     <span >PRICE</span>
                   <i className="fa fa-chevron-down filter-header-inner" aria-hidden="true"></i>
                  </button>
                  <Collapse isOpen={show1}>
                     <div className="filter-inner2">
                      <Input type="radio" name="price" className=""  onChange={()=>setPro({...pro,price:{'$gte':500,'$lte':1500}})} /><span  >500 to 1500</span>
                      </div>
                      <div className="filter-inner2">
                      <Input type="radio" name="price" className=""   onChange={()=>setPro({...pro,price:{'$gte':1501,'$lte':2500}})} /><span >1501 to 2500 </span>
                      </div>
                      <div className="filter-inner2">
                      <Input type="radio" name="price" className=""  onChange={()=>setPro({...pro,price:{'$gte':2501,'$lte':3500}})} /><span>2501 to 3500</span>
                      </div>
                      <div className="filter-inner2">
                      <Input type="radio" name="price" className=""  onChange={()=>setPro({...pro,price:{'$gte':3500}})}  /><span>3500 &amp;above</span>
                      </div>
                   </Collapse>
                  </div> 
               </div>
            <div className="row filter-side-con-in">
              <div className="col-12 filter-side-con-in">
                <button type="button" className="filter-header btn" onClick={() => showCount2(!show2)}>
                  <span >SIZE</span>
                  <i className="fa fa-chevron-down filter-header-inner" aria-hidden="true"></i>
                </button>
                <Collapse isOpen={show2}>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'28'} onChange={onChange} /><span >28</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'32'} onChange={onChange} /><span >32</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'34'} onChange={onChange} /><span>34</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'36'} onChange={onChange} /><span>36</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'38'} onChange={onChange} /><span>38</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'40'} onChange={onChange} /><span>40</span>
                  </div>
                  <div className="filter-inner2">
                    <Input type="radio" name="size" className="" value={'42'} onChange={onChange} /><span>42</span>
                  </div>
                </Collapse>
              </div>
            </div>
            <div className="row filter-side-con-in">
                   <div className="col-12 filter-side-con-in">
                   <button type="button" className="filter-header btn" onClick={() => showCount3(!show3)}>
                     <span >BRAND</span>
                   <i className="fa fa-chevron-down filter-header-inner" aria-hidden="true"></i>
                  </button>
                  <Collapse isOpen={show3}>
                     <div className="filter-inner2">
                      <Input type="radio" name="brand" className=""  value={ 'Blue Saint'} onChange={onChange} /><span  >Blue Saint</span>
                      </div>
                      <div className="filter-inner2">
                      <Input type="radio" name="brand" className=""  value={ 'CAMLA'} onChange={onChange} /><span >CAMLA</span>
                      </div>
                      <div className="filter-inner2">
                      <Input type="radio" name="brand" className="" value={ 'Puma'} onChange={onChange} /><span>Puma</span>
                      </div>
                      <div className="filter-inner2">
                      <Input type="radio" name="brand" className="" value={ 'Roadster'} onChange={onChange}  /><span>Roadster</span>
                      </div>
                   </Collapse>
                  </div> 
               </div>
          </div>  
          <div className="col-10">
            {/* <div className="row"> */}
                 <Content product={product}></Content>
            {/* </div> */}
        </div>
        </div>
      
      </Container>
    </div>
  )
}

export default sidebar
