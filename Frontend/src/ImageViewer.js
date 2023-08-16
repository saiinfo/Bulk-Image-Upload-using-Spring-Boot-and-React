import React, { useState } from 'react';

function ImageViewer({ imageUrl }) {
  return (
    <div>
      <h2>Image Viewer</h2>
      {imageUrl && <img src={imageUrl} alt="Viewed Image" />}
    </div>
  );
}

export default ImageViewer;
