import React from "react";

export default function Pitch() {
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div className="card">
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">Today's Combo Offer</p>
                <div
                  className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                  style={{ width: 35, height: 35 }}
                >
                  <p className="text-white mb-0 small">x4</p>
                </div>
              </div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                className="card-img-top"
                alt="Laptop"
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a href="#!" className="text-muted">
                      Laptops
                    </a>
                  </p>
                  <p className="small text-danger">
                    <s>$1099</s>
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">HP Notebook</h5>
                  <h5 className="text-dark mb-0">$999</h5>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted mb-0">
                    Available: <span className="fw-bold">6</span>
                  </p>
                  <div className="ms-auto text-warning">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
