import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavbarText
} from 'reactstrap';
import Sreach from './sreachBar';
import Drop from './dropsown/dropdown';
import DropCon from './menu';
import { Link, withRouter } from 'react-router-dom'


class myNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false,
      token: localStorage.usertoken,
      count: ''
    };
  }
  componentDidMount() {
    fetch(`http://localhost:5000/bag/getCount/${this.state.token}`)
      .then(res => res.json())
      .then(count => this.setState({ count }));
  }
  men() {
    window.location = "/Men";
  }
  women() {
    window.location = "/Wemon";
  }
  kids() {
    window.location = "/Kids";
  }
  home() {
    window.location = "/HomeLiving";
  }
  discover() {
    window.location = "/Discover";
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }
  render() {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/"><img className="b-img" src="https://seeklogo.com/images/M/myntra-logo-B3C45EAD5C-seeklogo.com.png" /></NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar className="nav-sap nav-font">
              <DropdownToggle nav >
                <a onClick={this.men.bind(this)}>
                  MEN
                </a>
              </DropdownToggle>
              <DropdownMenu right className=" dro-nav">
                <DropCon />
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar className="nav-font">
              <DropdownToggle nav>
                <a onClick={this.women.bind(this)}>
                  WOMEN
                </a>
              </DropdownToggle>
              <DropdownMenu right className=" dro-nav">
                <DropCon />
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar className="nav-font">
              <DropdownToggle nav>
                <a onClick={this.kids.bind(this)}>
                  KIDS
                </a>
              </DropdownToggle>
              <DropdownMenu right className=" dro-nav">
                <DropCon />
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar className="nav-font">
              <DropdownToggle nav className="nav-ho" >
                <a onClick={this.home.bind(this)}>
                  HOME &amp; LIVING
                </a>
              </DropdownToggle>
              <DropdownMenu right className=" dro-nav">
                <DropCon />
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar className="nav-font">
              <DropdownToggle nav className="nav-dis">
                <a onClick={this.discover.bind(this)}>
                  DISCOVER
                </a>
              </DropdownToggle>
              <DropdownMenu right className=" dro-nav">
                <DropCon />
              </DropdownMenu>
            </UncontrolledDropdown>
            <Sreach />
          </Nav>
          <NavbarText>
            {/* <img  className="nav-ico-user" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7pHJh_XM2k2Ylln6TdlH_RjpBwyvK0pPBjh8Tmf8nAugNXsE&s'}/>
           <h5 className="nav-icon-user-text">Profile</h5> */}
            <Drop />
            <a href="/wish/love">
              <img className="nav-ico-wish" src={'https://image.flaticon.com/icons/png/512/1096/1096433.png'} />
              <h5 className="nav-icon-wish-text">Whislist</h5>
            </a>
            {(this.state.count.count != undefined) ?
              (<a href="/bag/buy">
                <img className="nav-ico-bag" src={'data:image/png;base64,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'} />
                {(this.state.count.count == '0') ? (<span></span>) :
                  (<span class="desktop-badge 
                    desktop-melon" data-reactid="807">{this.state.count.count}</span>)}
                <h5 className="nav-icon-bag-text">BAG</h5>
              </a>) :
              (<a href="/login">
                <img className="nav-ico-bag" src={'data:image/png;base64,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'} />
                <h5 className="nav-icon-bag-text">Bag</h5>
              </a>)}

          </NavbarText>
        </Collapse>
      </Navbar>

    );
  }
}
export default withRouter(myNavbar);