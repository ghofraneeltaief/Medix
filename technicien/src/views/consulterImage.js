import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import "./image.css";
function Imagemedical() {
  let { Id_Rdv } = useParams();
  const [images, setImages] = useState([]);

  const loadTableList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/imageriemedicale/image/${Id_Rdv}`
      );
      const imageArray = response.data.map((record) => ({
        original: `http://localhost:5000/images/${record.FicheImg.replace(
          / /g,
          "_"
        )}`,
        thumbnail: `http://localhost:5000/images/${record.FicheImg.replace(
          / /g,
          "_"
        )}`,
        originalAlt: "Imagerie Médicale",
        thumbnailAlt: "Imagerie Médicale",
      }));
      setImages(imageArray);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  useEffect(() => {
    loadTableList();
  }, [Id_Rdv]);

  return (
    <>
      {images.length > 0 ? (
        <ImageGallery
          items={images}
          showThumbnails={true}
          showFullscreenButton={true}
          showPlayButton={true}
          useBrowserFullscreen={true}
          additionalClass="app-image-gallery"
          showIndex={true}
        />
      ) : (
        <p>Chargement...</p>
      )}
    </>
  );
}

export default Imagemedical;
