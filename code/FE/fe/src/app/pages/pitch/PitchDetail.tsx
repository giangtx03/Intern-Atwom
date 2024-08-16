import React from "react";
import { Link } from "react-router-dom";

export default function PitchDetail() {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                <h4 className="mb-sm-0">Pitch Details</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Pitch Details</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row gx-lg-5">
                    <div className="col-xl-4 col-md-8 mx-auto">
                      <div className="product-img-slider sticky-side-div">
                        <div className="swiper product-thumbnail-slider p-2 rounded bg-light">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <img
                                src="assets/images/products/img-8.png"
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                            <div className="swiper-slide">
                              <img
                                src="assets/images/products/img-6.png"
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                            <div className="swiper-slide">
                              <img
                                src="assets/images/products/img-1.png"
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                            <div className="swiper-slide">
                              <img
                                src="assets/images/products/img-8.png"
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                          </div>
                          <div className="swiper-button-next material-shadow" />
                          <div className="swiper-button-prev material-shadow" />
                        </div>
                        {/* end swiper thumbnail slide */}
                        <div className="swiper product-nav-slider mt-2">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="nav-slide-item">
                                <img
                                  src="assets/images/products/img-8.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="nav-slide-item">
                                <img
                                  src="assets/images/products/img-6.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="nav-slide-item">
                                <img
                                  src="assets/images/products/img-1.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="nav-slide-item">
                                <img
                                  src="assets/images/products/img-8.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end swiper nav slide */}
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-xl-8">
                      <div className="mt-xl-0 mt-5">
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <h4>Full Sleeve Sweatshirt for Men (Pink)</h4>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-3 col-sm-6">
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <i className="ri-money-dollar-circle-fill" />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <p className="text-muted mb-1">Price :</p>
                                  <h5 className="mb-0">$120.40</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end col */}
                        </div>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="mt-4">
                              <h5 className="fs-14">Sizes :</h5>
                              <div className="d-flex flex-wrap gap-2">
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-trigger="hover"
                                  data-bs-placement="top"
                                  title="Out of Stock"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name="productsize-radio"
                                    id="productsize-radio1"
                                    disabled
                                  />
                                  <label
                                    className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                    htmlFor="productsize-radio1"
                                  >
                                    S
                                  </label>
                                </div>
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-trigger="hover"
                                  data-bs-placement="top"
                                  title="04 Items Available"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name="productsize-radio"
                                    id="productsize-radio2"
                                  />
                                  <label
                                    className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                    htmlFor="productsize-radio2"
                                  >
                                    M
                                  </label>
                                </div>
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-trigger="hover"
                                  data-bs-placement="top"
                                  title="06 Items Available"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name="productsize-radio"
                                    id="productsize-radio3"
                                  />
                                  <label
                                    className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                    htmlFor="productsize-radio3"
                                  >
                                    L
                                  </label>
                                </div>
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-trigger="hover"
                                  data-bs-placement="top"
                                  title="Out of Stock"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name="productsize-radio"
                                    id="productsize-radio4"
                                    disabled
                                  />
                                  <label
                                    className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                    htmlFor="productsize-radio4"
                                  >
                                    XL
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end row */}
                        <div className="mt-4 text-muted">
                          <h5 className="fs-14">Description :</h5>
                          <p>
                            Tommy Hilfiger men striped pink sweatshirt. Crafted
                            with cotton. Material composition is 100% organic
                            cotton. This is one of the world’s leading designer
                            lifestyle brands and is internationally recognized
                            for celebrating the essence of classic American cool
                            style, featuring preppy with a twist designs.
                          </p>
                        </div>
                        <div className="product-content mt-5">
                          <h5 className="fs-14 mb-3">Pitch Description :</h5>
                          <div
                            className="tab-content border border-top-0 p-4"
                            id="nav-tabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="nav-speci"
                              role="tabpanel"
                              aria-labelledby="nav-speci-tab"
                            >
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody>
                                    <tr>
                                      <th scope="row" style={{ width: 200 }}>
                                        Category
                                      </th>
                                      <td>T-Shirt</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Brand</th>
                                      <td>Tommy Hilfiger</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Color</th>
                                      <td>Blue</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Material</th>
                                      <td>Cotton</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Weight</th>
                                      <td>140 Gram</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* container-fluid */}
      </div>
    </div>
  );
}
