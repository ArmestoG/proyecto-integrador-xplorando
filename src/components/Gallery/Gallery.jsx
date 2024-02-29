import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams de React Router
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import galleryStyles from './Gallery.module.css';
import { producto } from '../../components/data'; 
 // Importar los datos de los productos

const Gallery = () => {
  const [images, setImages] = useState([]);
  const { id } = useParams();
  console.log(id); // Obtener el ID del producto desde la URL

  useEffect(() => {
    // Buscar el producto por ID
    const product = producto.find(item => item.id === parseInt(id));
    if (product) {
      // Crear el array de imágenes solo para el producto encontrado
      const productImages = [];
      for (let i = 1; i <= 5; i++) {
        if (product[`imageurl${i}`]) {
          productImages.push({
            original: product[`imageurl${i}`],
            thumbnail: product[`imageurl${i}`]
          });
        }
      }
      setImages(productImages);
    }
  }, [id]); // Ejecutar efecto cuando cambia el ID del producto

  const [showThumbnails, setShowThumbnails] = useState(true);

  const handleScreenChange = (isFullScreen) => {
    setShowThumbnails(!isFullScreen);
  };

  return (
    <>
      <div className={galleryStyles.container}>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showBullets={true}
          autoPlay={false}
          showThumbnails={showThumbnails}
          onScreenChange={handleScreenChange}
        />
      </div>
    </>
  );
};

export default Gallery;

