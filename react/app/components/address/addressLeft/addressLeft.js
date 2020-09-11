import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import axios from 'axios';
function addressLeft(props) {
    const token = localStorage.usertoken
    const [name, setName] = useState({ place: 'Home', token: token })
    const [count, setCount] = useState(0)

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
    const ok=()=>{
            axios
                .post('http://localhost:5000/address/AddressCreate', { ...name })
                .then(res => {
                    alert(res.data.message)
                    if(res.data.message==='address added successfully'){
                        window.location='http://localhost:3000/address/add'
                    }
                })
                .catch(err => {
                    console.log(err)
                })
    }
    return (
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
    )
}

export default addressLeft

