import React, { useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jquery'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddressLeft from '../addressLeft/addressLeft'


function addressok(props) {
    const token = localStorage.usertoken;
    const [add, setAdd] = useState([])
    const [del, setdel] = useState([])
    const [Id, setID] = useState({ addressId: '' })
    const [name, setName] = useState({ addressId: '', workingHour: '' })
    const [order, setOrder] = useState({ data: '' })
    const {
        // buttonLabel,
        className
    } = props;
    const [select, setSelect] = useState({ addressId: '' })
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);

    const toggle = () => setModal(!modal);
    const toggle1 = () => setModal1(!modal1);

    $('document').ready(() => {
        $('#addressType-home').click(() => {
            $('#addressType-office').removeClass('addressFormUI-base-addressTypeIcon addressFormUI-base-selectedAddressType')
            $('#addressType-office').addClass('addressFormUI-base-addressTypeIcon')
            $('#addressType-home').removeClass('addressFormUI-base-addressTypeIcon')
            $('#addressType-home').addClass('addressFormUI-base-addressTypeIcon addressFormUI-base-selectedAddressType')
            $(".addressFormUI-base-subAddress").hide(200)
        })
        $('#addressType-office').click(() => {
            $('#addressType-home').removeClass('addressFormUI-base-addressTypeIcon addressFormUI-base-selectedAddressType')
            $('#addressType-home').addClass('addressFormUI-base-addressTypeIcon')
            $('#addressType-office').removeClass('addressFormUI-base-addressTypeIcon')
            $('#addressType-office').addClass('addressFormUI-base-addressTypeIcon addressFormUI-base-selectedAddressType')
            $(".addressFormUI-base-subAddress").show(200)
        })
    })

    //get address
    useEffect(() => {
        axios
            .get(`http://localhost:5000/address/GetAllAddress`, {
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                return setAdd(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [token])
    //address delete
    useEffect(() => {
        axios
            .delete(`http://localhost:5000/address/DeleteAddress`, {
                headers: {
                    Authorization: token
                },
                data: { addressId: Id.addressId }
            })
            .then(res => {
                if (res.data.message == 'address deleted successfully') {
                    alert(res.data.message)
                    window.location = 'http://localhost:3000/address/add'
                }
                return setdel(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [Id])

    const ok = () => {
        axios
            .put('http://localhost:5000/address/UpdateAddress', { ...name })
            .then(res => {
                alert(res.data.message)
                if (res.data.message === 'address updated successfully') {
                    window.location = 'http://localhost:3000/address/add'
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (select.addressId != '') {
        $('#addressOk').show(500)
    }
    else {
        $('#addressOk').hide(500)
    }
    //order create

    useEffect(() => {
        axios
            .post('http://localhost:5000/order/CreateOrder', { ...select })
            .then(res => {
                console.log(res.data.data)
                if (res.data.message == 'product added in your order successfully') {
                    alert(res.data.message)
                    window.location = "/order/buy"
                }
                else {
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [order])
    const address = () => {
        return add.map(data => {
            return (
                <div key={data._id} className="addressBlocks-base-block addressBlocks-base-serviceable" id="213735894" data-action="select">
                    <input type="radio" id='selectAddress' onClick={() => setSelect({ addressId: data._id, token: token, status: 'Ordered',total:props.total,offer:props.offer,deliveryCharge:props.deliveryCharge,code:props.code, payment: 'Cash on Delivery' })} name="selectAddress" className="addressBlocks-base-radioIcon" />
                    <div>
                        <div>
                            <div className="addressDetails-base-addressTitle">
                                <div className="addressDetails-base-name">{data.name}</div>
                                <div className="addressDetails-base-addressType">{data.place}</div>
                            </div>
                            <div className="addressDetails-base-addressField addressBlocks-base-addressDetail">{data.address}</div>
                            <span>{data.city}, {data.state} - </span>
                            <span>{data.pinCode}</span>
                        </div>
                        <div className="addressDetails-base-mobile">
                            <span>Mobile: </span>
                            <span>+91{data.mobile}</span>
                        </div>
                    </div>
                    <div className="addressServiceability-base-container">
                        <div>
                            <span className="addressServiceability-base-bullet">•</span>
                            <span>Cash on Delivery available</span>
                        </div>
                    </div>
                    <div className="addressBlocks-base-btns">
                        <button type="button" className="addressBlocks-base-remove" onClick={async () => { await setID({ ...Id, addressId: data._id, token: token }); await on() }} >Remove</button>
                        <button className="addressBlocks-base-edit" data-action="showModal" onClick={
                            async () => {
                                await setName({
                                    ...Id,
                                    addressId: data._id,
                                    token: token,
                                    state: data.state,
                                    locality: data.locality,
                                    pinCode: data.pinCode,
                                    workingHour: data.workingHour,
                                    city: data.city,
                                    name: data.name,
                                    place: data.place,
                                    address: data.address,
                                    mobile: data.mobile
                                }), await setModal1(!modal1)
                            }}>Edit</button>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <div className="addressList-base-titleContainer">
                <div className="addressList-base-title">Select Delivery Address</div>
                <div data-action="add" className="addressList-base-addAddressButton">
                    <div className="" onClick={() => { setEdit({ addressId: '' }) }, toggle}>ADD NEW ADDRESS</div>
                </div>
            </div>
            <div className="addressList-base-defaultTitle">DEFAULT ADDRESS</div>
            {address()}
            <div data-action="add" className="addressList-base-addBlock">
                <div className="addressList-base-label" onClick={toggle}>+ Add New Address</div>
            </div>
            <div className='modelok'>
                <Modal isOpen={modal1} toggle={toggle1} className={className, 'modelok'}>
                    <ModalHeader className='modelok addressFormUI-base-header' toggle={toggle1}>EDIT ADDRESS</ModalHeader>
                    <ModalBody className={'modelok'}>
                        <div className="addressDesktop-base-left">
                            <div className="addressDesktop-base-addAddressContainer">
                                <div className="addressFormUI-base-container">
                                    <form>
                                        <div className="addressFormUI-base-scrollable">
                                            <div className="addressFormUI-base-formHeader">CONTACT DETAILS</div>
                                            <div className="addressFormUI-base-form addressDesktop-base-removeMargin">
                                                <div className="inputV2-base-inputRow addressFormUI-base-inputRow">
                                                    <label htmlFor="name" className="inputV2-base-label">Name*</label>
                                                    <input className="inputV2-base-input" placeholder='' name="name" type="text" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.name} required />
                                                </div>
                                                <div className="inputV2-base-inputRow ">
                                                    <label htmlFor="mobile" className="inputV2-base-label">Mobile No*</label>
                                                    <input className="inputV2-base-input" name="mobile" placeholder='' type="tel" maxLength="10" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.mobile} />
                                                </div>
                                            </div>
                                            <div className="addressFormUI-base-formHeader">ADDRESS</div>
                                            <div className="addressFormUI-base-form addressDesktop-base-removeMargin">
                                                <div className="addressFormUI-base-pincodeBlock">
                                                    <div className="inputV2-base-inputRow ">
                                                        <label htmlFor="pincode" className="inputV2-base-label">Pin Code*</label>
                                                        <input className="inputV2-base-input" name="pinCode" placeholder='' type="tel" maxLength="6" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.pinCode} />
                                                    </div>
                                                </div>
                                                <div className="inputV2-base-inputRow addressFormUI-base-inputRow">
                                                    <label htmlFor="streetAddress" className="inputV2-base-label">Address (House No, Building, Street, Area)*</label>
                                                    <input className="inputV2-base-input" name="address" placeholder='' type="text" row="3" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.address} />
                                                </div>
                                                <div className="localityOptions-base-localityBlock" tabIndex="-1">
                                                    <div className="inputV2-base-inputRow ">
                                                        <label htmlFor="locality" className="inputV2-base-label">Locality / Town*</label>
                                                        <input className="inputV2-base-input" name="locality" placeholder='' type="text" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.locality} />
                                                    </div>
                                                </div>
                                                <div className="addressFormUI-base-cityContainer">
                                                    <div className="inputV2-base-inputRow addressFormUI-base-halfWidth">
                                                        <label htmlFor="city" className="inputV2-base-label">City / District*</label>
                                                        <input className="inputV2-base-input" name="city" type="text" placeholder='' disabled="" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.city} />
                                                    </div>
                                                    <div className="inputV2-base-inputRow addressFormUI-base-halfWidth">
                                                        <label htmlFor="state" className="inputV2-base-label">State*</label>
                                                        <input className="inputV2-base-input" name="state" type="text" placeholder='' disabled="" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={name.state} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="addressFormUI-base-formHeader">SAVE ADDRESS AS</div>
                                            <div className="addressFormUI-base-form addressDesktop-base-removeMargin">
                                                <div className="addressFormUI-base-addressTypes">
                                                    <button type='button' className="addressFormUI-base-addressTypeIcon addressFormUI-base-selectedAddressType" id="addressType-home" name="place1" onClick={e => setName({ ...name, place: e.target.value, workingHour: '' })} value="Home">Home</button>
                                                    <button type='button' className="addressFormUI-base-addressTypeIcon " id="addressType-office" name="place2" onClick={e => setName({ ...name, place: e.target.value })} value="Work">Work</button>
                                                    <div className="addressFormUI-base-subAddress" style={{ display: 'none' }}>
                                                        <div className="addressFormUI-base-subAddressDay" id="notAvailableDays-SATURDAY" data-value="false">
                                                            <input type='radio' className="addressFormUI-base-subAddressLabel" name="workingHour" onClick={e => setName({ ...name, [e.target.name]: e.target.value })} value={'SATURDAY'} />Open on saturday
                                        </div>
                                                        <div className="addressFormUI-base-subAddressDay" id="notAvailableDays-SUNDAY" data-value="false">
                                                            <input type='radio' className="addressFormUI-base-subAddressLabel" name="workingHour" onChange={e => setName({ ...name, [e.target.name]: e.target.value })} value={'SUNDAY'} />Open on sunday
                                        </div>
                                                    </div>
                                                    <div className="addressFormUI-base-error"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="addressFormUI-base-footer">
                                            <button type='button' name='sub' onClick={ok} className="button-base-button addressFormUI-base-saveBtn">ADD ADDRESS</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={modal} toggle={toggle} className={className ,'modelok'}>
                    <ModalHeader className='modelok addressFormUI-base-header' toggle={toggle}>ADD NEW ADDRESS</ModalHeader>
                    <ModalBody className={'modelok'}>
                        <AddressLeft />
                    </ModalBody>
                </Modal>
            </div>
            <div style={{
                position: 'absolute',
                top: '350px',
                left: '730px'
            }}>
                <a onClick={() => setOrder({ data: 1 })} >
                    <div style={{ display: 'none' }} id='addressOk' className="button-base-button ">Continue Order</div>
                </a>
            </div>
        </div>
    )
}

export default addressok

