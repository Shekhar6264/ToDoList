import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Card from './card';
// import Pushpa from './15-4';
// import List from './list';
// import Button from './Button';
// import PP from './Profilepicture'
// import MC from './MyComponent';
// import Counter from './Count';
// import ColorPicker from './colorpicker';
// import Demo from './18-4-2'
import reportWebVitals from './reportWebVitals';
import ToDoList from './ToDoList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ToDoList/>
  </React.StrictMode>
);

reportWebVitals();
