import React from 'react';

function ExampleCarouselImage({ text }) {
    const defaultImageUrl = '/user/images/banner-1.jpg'
  return (
    <div>
      {/* Here, you can place whatever content you want for your carousel image */}
      {/* For demonstration, I'm simply showing the text passed as a prop */}
      <img src={defaultImageUrl} alt={text} width='100%' height='400px' />
      <p>{text}</p>
    </div>
  );
}

export default ExampleCarouselImage;
