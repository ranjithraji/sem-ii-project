import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";

const SearchPage = () => {
  return (
    <MDBCol  className="nav-sre"  lg="6">
      <form className="form-inline mt-4 mb-4">
       <button className="btn nav-btn-sre"><MDBIcon className="nav-sre-fa" icon="search" /></button>
        <input className="nav-sre-in form-control form-control-md w-75" type="text" placeholder="Search" aria-label="Search" />
      </form>
    </MDBCol>
  );
}

export default SearchPage;