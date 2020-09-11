import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

import { Link, withRouter } from 'react-router-dom'


class myNavbars extends React.Component {
    constructor() {
        super();
        this.state = {
            address: '/address/add'
        }
    }

    render() {
        return (
            <Navbar light expand="md">
                <NavbarBrand href="/"><img className="b-img" src="https://seeklogo.com/images/M/myntra-logo-B3C45EAD5C-seeklogo.com.png" /></NavbarBrand>
                <NavbarToggler />
                <Collapse navbar>
                    <div className="row cartNavbar-center">

                        {this.state.address === window.location.pathname ?
                            (
                                <ol className=" checkout-steps col-12">
                                    <li className="step step1">BAG</li>
                                    <li className="divider"></li>
                                    <li className="step step2 active"> &nbsp;ADDRESS </li>
                                    <li className="divider"></li>
                                    <li className="step step3"> &nbsp;PAYMENT</li>
                                </ol>) : (
                                <ol className=" checkout-steps col-12">
                                    <li className="step step1 active">BAG</li>
                                    <li className="divider"></li>
                                    <li className="step step2"> &nbsp;ADDRESS </li>
                                    <li className="divider"></li>
                                    <li className="step step3"> &nbsp;PAYMENT</li>
                                </ol>

                            )
                        }

                    </div>
                    <NavbarText>

                    </NavbarText>
                    <div className="secureContainer">
                        <div className="sprite-secure secureIcon"></div>
                        <div className="secure">100% SECURE</div>
                    </div>
                </Collapse>
            </Navbar>

        );
    }
}
export default withRouter(myNavbars);