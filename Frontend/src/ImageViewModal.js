import React from 'react';
import Modal from 'react-modal';
import './ImageViewModal.css'; // Import your custom CSS file for styling

Modal.setAppElement('#root'); // Set the app element for screen readers

function ImageViewModal({ isOpen, onRequestClose, imageUrl }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Image"
      className="custom-modal" // Apply custom CSS class for styling
      overlayClassName="custom-overlay" // Apply custom overlay CSS class for styling
    >
      <button className="close-button" onClick={onRequestClose}>
        Close
      </button>
      {imageUrl && <img src={imageUrl} alt="Viewed Image" className="modal-image" />}
    </Modal>
  );
}

export default ImageViewModal;
