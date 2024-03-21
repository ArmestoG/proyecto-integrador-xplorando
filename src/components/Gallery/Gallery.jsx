import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import galleryStyles from './Gallery.module.css';

const Gallery = ({ id }) => {
    const [images, setImages] = useState([]);

   useEffect(() => {
        fetch(`http://localhost:8080/productos/${id}`)
            .then(response => { 
                
                if (!response.ok) {
                    throw new Error('Error al obtener las imágenes del producto');
                }
                return response.json();
            })
            .then(data => {
                // Convertir los datos de las imágenes a un formato adecuado para la galería de imágenes
             


                setImages(productImages);
            })
            .catch(error => console.error('Error fetching product images:', error));
    }, [id]);

        /* const productImages = data.map(image => ({
                    original: image.url,
                    thumbnail: image.url
                }));
*/

    const [showThumbnails, setShowThumbnails] = useState(true);

    const handleScreenChange = (isFullScreen) => {
        setShowThumbnails(!isFullScreen);
    };

    return (
        <div>
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
        </div>
    );
};

export default Gallery;