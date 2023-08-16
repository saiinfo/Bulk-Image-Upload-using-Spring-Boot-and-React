import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageViewModal from './ImageViewModal';

function ImageList() {
  const [imageFilenames, setImageFilenames] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  useEffect(() => {
    async function fetchImageFilenames() {
      try {
        const response = await axios.get('/api/images/all');
        setImageFilenames(response.data);
      } catch (error) {
        console.error('Error fetching image filenames:', error);
      }
    }

    fetchImageFilenames();
  }, []);

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImageUrl('');
  };

  return (
    <div>
      <h2>Image List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image Filename</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imageFilenames.map((filename) => (
              <TableRow key={filename}>
                <TableCell>{filename}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => openModal(`/api/images/view/${filename}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ImageViewModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={modalImageUrl}
      />
    </div>
  );
}

export default ImageList;
