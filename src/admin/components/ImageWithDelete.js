import React from 'react';

const ImageWithDelete = ({ src, onDelete }) => {
  return (
    <div className='m-2'>
      <img src={src} width={100} alt="Preview" />
      <span
        className="delete-icon"
        onClick={onDelete}
        role="button"
        tabIndex={0}
      >
        &#x2716; {/* Unicode character for the 'x' symbol */}
      </span>
    </div>
  );
};

export default ImageWithDelete;
