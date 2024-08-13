import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div><div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style={{width:'100%'}}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <h1 className="fs-5 d-none d-sm-inline">Helishoter</h1>
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li
                  className="nav-item d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                  <span className="ms-1 d-none d-sm-inline" >Category</span>
                </li>
                <li
                  className="nav-item d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                  
                >
                  <span className="ms-1 d-none d-sm-inline" >Product</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div></div>
  )
}
