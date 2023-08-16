import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

import './ImageUpload.css';

function ImageUpload() {
  const [uploadedMessage, setUploadedMessage] = useState('');
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const handleImageUpload = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await axios.post('/api/images/upload', formData);
      setUploadedMessage('Images uploaded successfully.');
      setSuccessModalIsOpen(true);
    } catch (error) {
      setUploadedMessage('Error uploading images.');
      setErrorModalIsOpen(true);
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <div className="upload-icon">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
            </div>
            <p>Drag & drop images here, or click to select files</p>
          </div>
        )}
      </Dropzone>

      {/* Success Modal */}
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={() => setSuccessModalIsOpen(false)}
        contentLabel="Success Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <h2><center>Upload Successful</center></h2>
          
        </div>
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" color="#007bff" />
        </div>
        <p>Your images have been uploaded successfully.</p>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
        contentLabel="Error Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <h2>Error</h2>
          <button onClick={() => setErrorModalIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <p>There was an error uploading the images.</p>
      </Modal>

      <p className="uploaded-message">{uploadedMessage}</p>
    </div>
  );
}

export default ImageUpload;
