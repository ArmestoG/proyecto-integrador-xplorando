import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../components/Gallery/Gallery';
import detailStyles from './Detail.module.css';

const Detail = () => {
    const { id } = useParams(); // Obtener el id del producto de la URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/productos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    if (!product) {
        return <div>Cargando...</div>;
    }

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
                        <div className={detailStyles.detailText}>
                            <h4>Detalle producto</h4>
                            <p>{product.descripcionProducto}</p>
                        </div>
                        <hr />
                        <div className={detailStyles.detailPrice}>
                            <h3>{product.precioProducto}</h3>
                        </div>
                        <button className={detailStyles.btn}>INICIAR RESERVA</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Detail;