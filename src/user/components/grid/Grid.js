import React, { useState } from 'react';
import './Card.css'; // Ensure this path is correct

function Grid({ item }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        console.log("Hello")
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const renderImages = () => {
        const photos = item.length;

        if (photos === 1) {
            return (
                <img
                    src={item[0]}
                    className="card-img-top single-image"
                    alt="..."
                    onClick={() => handleImageClick(item[0])}
                />
            );
        } else if (photos === 2) {
            return (
                <div className="image-split">
                    <img
                        src={item[0]}
                        className="split-image"
                        alt="..."
                        onClick={() => handleImageClick(item[0])}
                    />
                    <img
                        src={item[1]}
                        className="split-image"
                        alt="..."
                        onClick={() => handleImageClick(item[1])}
                    />
                </div>
            );
        } else if (photos === 4) {
            return (
                <div className="image-grid-four">
                    {item.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className="grid-image-four"
                            alt="..."
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
            );
        } else if (photos === 5) {
            return (
                <div className="image-grid-five">
                    <img
                        src={item[0]}
                        className="big-image"
                        alt="..."
                        onClick={() => handleImageClick(item[0])}
                    />
                    {item.slice(1).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className="grid-image-five"
                            alt="..."
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className="image-grid">
                    {item.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className="grid-image"
                            alt="..."
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
            );
        }
    };

    return (
        <div className=''>
            {renderImages()}
            {isModalOpen && (
                <div className="modal-view">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <img src={selectedImage} alt="Selected" className="modal-image" />
                    </div>
                </div>
            )}

        </div>
    );
}

export default Grid;
