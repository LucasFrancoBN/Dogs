import React from "react";
import Image from "../../Helper/Image/Image";
import styles from "./FeedPhotoItems.module.css";

const FeedPhotoItems = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotoItems;
