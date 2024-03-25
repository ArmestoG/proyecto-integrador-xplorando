import React from "react";
import "../../Busqueda/Components/CarruselBuscador.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Search({ arrayBusqueda }) {
  return (
    <Carousel
      responsive={{
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
    >
      {arrayBusqueda.map((resultadoBusqueda, index) => {
        return (
          <div className="carrousel-card">
            <div className="rBusqueda" key={index}>
              <div className="div-img">
                <img
                  src={resultadoBusqueda.imagenSalidaDtoList[0].urlImagen}
                  className="imgRBusqueda"
                />
                <div className="resultadoBusqueda-div">
                  <div>
                    <div className="resultadoBusqueda-nombre">
                      {resultadoBusqueda.nombreProducto}
                    </div>
                    <div className="resultadoBusqueda-precio">
                      {resultadoBusqueda.precioProducto}
                    </div>
                    <div className="h7Busqueda">
                      <h7>{resultadoBusqueda.descripcionProducto}</h7>
                    </div>
                  </div>

                  <div className="divbutBusqueda">
                    <button className="butBusqueda">Reservar estadía</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
