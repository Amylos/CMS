// import React, { useState, useEffect } from 'react';
// import Chart from './Chart';

// const Shape = ({ type }) => {
//   const [blocks, setBlocks] = useState([]);
//   const [titleValue, setTitleValue] = useState('');
//   const [textValue, setTextValue] = useState('');
//   const [imageValue, setImageValue] = useState(null); // Ajout de l'état pour l'image
//   const [showPopup, setShowPopup] = useState(false);

//   const addBlock = (type) => {
//     if (!blocks.find((block) => block.type === type)) {
//       setBlocks([...blocks, { type, id: Date.now() }]);
//     }
//   };

//   const updateBlockValue = (id, value) => {
//     const updatedBlocks = blocks.map((block) =>
//       block.id === id ? { ...block } : block
//     );
//     const blockToUpdate = updatedBlocks.find((block) => block.id === id);
//     if (blockToUpdate) {
//       blockToUpdate.value = value;
//     }
//     setBlocks(updatedBlocks);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageValue(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const deleteBlock = (id) => {
//     const updatedBlocks = blocks.filter((block) => block.id !== id);
//     setBlocks(updatedBlocks);
//   };

//   const clearAllBlocks = () => {
//     setBlocks([]);
//     setShowPopup(true);
//   };

//   useEffect(() => {
//     addBlock(type);
//   }, [type]);

//   return (
//     <div className='Shape'>
//       {blocks.map((block) => (
//         <div key={block.id}>
//           {block.type === 'title' && (
//             <div>
//               <input
//                 type="text"
//                 value={titleValue}
//                 onChange={(e) => {
//                   setTitleValue(e.target.value);
//                   updateBlockValue(block.id, e.target.value);
//                 }}
//                 placeholder="Title"
//               />
//               <button onClick={() => deleteBlock(block.id)}>Delete</button>
//             </div>
//           )}

//           {block.type === 'text' && (
//             <div>
//               <input
//                 type="text"
//                 value={textValue}
//                 onChange={(e) => {
//                   setTextValue(e.target.value);
//                   updateBlockValue(block.id, e.target.value);
//                 }}
//                 placeholder="Text"
//               />
//               <button onClick={() => deleteBlock(block.id)}>Delete</button>
//             </div>
//           )}

//           {block.type === 'image' && (
//             <div>
//               <input type="file" onChange={handleImageChange} />
//               {imageValue && <img src={imageValue} alt="Selected" />}
//               <button onClick={() => deleteBlock(block.id)}>Delete</button>
//             </div>
//           )}

//           {block.type === 'graph' && (
//             <div>
//               <Chart />
//               <button onClick={() => deleteBlock(block.id)}>Delete</button>
//             </div>
//           )}
//         </div>
//       ))}

//       <button onClick={clearAllBlocks}>Publish</button>

//       {showPopup && (
//         <div className="popup">
//           <p>Article créé!</p>
//           <button onClick={() => setShowPopup(false)}>Fermer</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shape;







/********************************** */


import React from 'react';

const Shape = (props) => {
  return (
    <div className='Shape'>
      Shape
      {/* Contenu du composant */}
    </div>
  );
};

export default Shape;
