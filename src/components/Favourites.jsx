import React from 'react';
import Photos from './Photos'; // Import the Photos component

const Favourite = ({ favoritePhotos, handleRemoveFavorite }) => {
  return (
    <div>
      {/* Sticky Navbar */}
      <nav className="navbar">
        <div className="navbar__logo">Photo-Flix</div>
        <div className="navbar__links">
          <a href="/">Home</a>
        </div>
      </nav>

      <main>
        <section className="photos">
          <div className="photos-center">
            {favoritePhotos.length > 0 ? (
              favoritePhotos.map((image) => (
                <Photos
                  key={image.id} // Use a unique identifier if available
                  {...image}
                  isFavorite={true} // All images in the Favourite component are favorites
                  onFavoriteClick={() => handleRemoveFavorite(image)} // Pass the handleRemoveFavorite function here
                >
                  {/* Pass isFavorite to Photos to show the favorite status */}
                  <span>Added to Favorites</span>
                </Photos>
              ))
            ) : (
              <p>No Favourite Photos</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favourite;
