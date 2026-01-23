import React from 'react';

const FlippableCard = ({ image, uspTitle, uspDescription, className = '' }) => {
  return (
    <div className={`flippable-card-3d ${className}`}>
      <div className="card-inner no-flip">
        {/* Static front - Image only */}
        <div className="card-front">
          <img src={image} alt={uspTitle} className="card-image animated-image" />
        </div>
        {/* Title and description below the image */}
        <div className="card-meta-below">
          <div className="card-title-below animated-text">{uspTitle}</div>
          <p className="card-description-below animated-text">{uspDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
