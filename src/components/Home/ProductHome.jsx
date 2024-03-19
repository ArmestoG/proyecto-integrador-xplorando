import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

export default function ProductHome() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/productos/buscarProductoPorId');
                console.log('Productos obtenidos:', response.data);
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <>
            <div className="random-products">
                <h2>¡Se viene el finde XL!</h2>
                <div className="row">
                    {product !== null && product.map((item) => (
                        <Product
                            key={item.id}
                            name={item.nombreProducto}
                            url={item.imagenSalidaDtoList[0].urlImagen}
                            price={item.precioProducto}
                            description={item.descripcionProducto}
                            id={item.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
