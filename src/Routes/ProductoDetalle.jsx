import { useParams } from 'react-router-dom';
import ProductHome from '../components/Home/ProductHome';
import Gallery from '../components/Gallery/Gallery';
import detailStyles from './Detail.module.css';

const Detail = () => {
    const { id } = useParams(); // Obtener el id del producto de la URL
    const product = ProductHome.find(item => item.id === parseInt(id)); // Buscar el producto en la lista por su id

     return (
        <div className={detailStyles.detail}>
            <main className={detailStyles.content}>
                <Gallery />
                <div className={detailStyles.detailInfoContainer}>
                    <div className={detailStyles.detailInfo}>
                        <h2>{product.name}</h2> {/* Mostrar el nombre del producto */}
                        <div className={detailStyles.stars}>
                            <span className={detailStyles.star}>&#9733;</span>
                            <span className={detailStyles.star}>&#9733;</span>
                            <span className={detailStyles.star}>&#9733;</span>
                            <span className={detailStyles.star}>&#9733;</span>
                            <span className={detailStyles.star}>&#9733;</span>
                        </div>
                        <div className={detailStyles.detailText}>
                            <h4>Detalle producto</h4>
                            <p>{product.description}</p> {/* Mostrar la descripción del producto */}
                        </div>
                        <hr />
                        <div className={detailStyles.detailPrice}>
                            <h3>{product.price}</h3> {/* Mostrar el precio del producto */}
                        </div>
                        <button className={detailStyles.btn}>INICIAR RESERVA</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Detail;