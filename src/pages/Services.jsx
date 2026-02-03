import React from "react";

const Services = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nos Services</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Conseils agricoles</h5>
              <p className="card-text">
                Des conseils adaptés à votre région, vos cultures et votre sol.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Vente & Achat</h5>
              <p className="card-text">
                Mise en relation entre agriculteurs et acheteurs pour vendre vos produits.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Prestations techniques</h5>
              <p className="card-text">
                Services de mécanisation, transport, stockage et transformation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
