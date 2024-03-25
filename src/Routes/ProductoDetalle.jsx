
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery/Gallery";
import detailStyles from "./Detail.module.css";
import CounterButton from "../components/CounterButton/CounterButton";
import DatePicker from "react-datepicker";

const Detail = () => {
  const { id } = useParams(); // Obtener el id del producto de la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  console.log(product);

  console.log("AAAA" + product.caracteristicas[0].nombreCaracteristica);
  return (
    <div className={detailStyles.detail}>
      <main className={detailStyles.content}>
        <Gallery id={id} />
        <div className={detailStyles.detailInfoContainer}>
          <div className={detailStyles.detailInfo}>
            <h2>{product.nombreProducto}</h2>
       
            <div className={detailStyles.stars}>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
            </div>
            <div>
              
              <h5>Detalle producto</h5>
              <p>{product.descripcionProducto}</p>
            </div>
            <hr />
            <h5>PRECIO CON IMPUESTO DESDE</h5>
            <div className={detailStyles.detailPrice}>
              <h3 className={detailStyles.h5}>{product.precioProducto}</h3>
            </div>
            <h7>(hasta 6 cuotas sin interés con tarjeta de Santander)</h7>
            <div className={detailStyles.init}>
            <CounterButton/>
            <button className={detailStyles.btn}>INICIAR RESERVA</button> </div>
          </div>
        </div>
      </main>
      <div className={detailStyles.container}>
        
              <h3 className={detailStyles.complejo}>
                <div className={detailStyles["caracteristicas-container"]}>
                {product.caracteristicas.map((caracteristica) => {
                  return (
                    <div className={detailStyles["caracteristicas"]}> 
                    <img src={caracteristica.icono}/>
                    <h3 key={caracteristica.id}>
                      {caracteristica.nombreCaracteristica}
                    </h3>

                    </div>
                  );
                })}
              </div></h3>
              
            </div>
    </div>
  );
};

export default Detail;