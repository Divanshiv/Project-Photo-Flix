import React, { useState } from 'react';
import { FaHeart, FaShare, FaDownload, FaThumbsUp } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Photos = ({
  id,
  urls: { regular, full },
  alt_description,
  likes,  
  user: { name, portfolio_url, profile_image: { medium } },
  onFavoriteClick,
  isFavorite,
}) => {
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(isFavorite);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleFavoriteClick = () => {
    setIsPhotoFavorite(!isPhotoFavorite);
    onFavoriteClick({
      id,
      urls: { regular, full },
      alt_description,
      likes,
      user: { name, portfolio_url, profile_image: { medium } },
    });
  };

  const handleShare = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this awesome photo: ${regular}`
    )}`;
    window.open(shareUrl, '_blank');
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = full;
    link.download = `photo_${id}.jpg`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className="photo">
      <img
        src={regular}
        alt={alt_description || "Photo by " + name} // Improved alt text
        onClick={openLightbox}
        loading="lazy" // Optional: for lazy loading images
      />
      <div className="photo-info">
        <div className="photo-header">
          <div className='name'>
          <h4>{name}</h4>
          <div className="btns">
          <button className="share-btn" onClick={handleShare}>
            <FaShare className="share-icon" />
          </button>
          <button className="download-btn" onClick={handleDownload}>
            <FaDownload className="download-icon" />
          </button>
       </div>
          </div>
          <button className={`favorite-btn ${isPhotoFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
            <span role="img" aria-label="Favorite">
              {isPhotoFavorite ? '❤️' : '♡'}
            </span>
          </button>
        </div>
        <div className="photo-actions">
          <p>
            <FaThumbsUp className="heart-icon" /> {likes}
          </p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} className="user-img" alt={`${name}'s profile`} />
        </a>
      </div>
     

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          onCloseRequest={closeLightbox}
          slides={[{ src: full }]} // Pass the full image for lightbox
        />
      )}
    </article>
  );
};

export default Photos;
