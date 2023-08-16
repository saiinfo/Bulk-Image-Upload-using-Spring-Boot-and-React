import React from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import ImageList from './ImageList';

function App() {
  return (
    <div className="App">
      <h1> Bulk Of Image Upload & Display</h1>
      <ImageUpload />
      <ImageList />
    </div>
  );
}

export default App;
