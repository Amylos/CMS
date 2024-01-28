import React, { useState } from 'react';

const Theme = () => {
  // State for theme customization
  const [titleAndTextColor, setTitleAndTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  const [textFontSize, setTextFontSize] = useState('16px');
  const [themeName, setThemeName] = useState('');
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  
  const HandlePublishTheme = async (event) => {
    console.log("handleplublishtheme", titleAndTextColor, backgroundColor, fontFamily, fontWeight)

      event.preventDefault();
  
      try {
        const currentDate = new Date().toISOString();
  
        // Create Theme
        const responseTheme = await fetch('http://localhost:8000/api/themes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            backgroundColor: backgroundColor,
            textColor: titleAndTextColor,
            fontFamily: fontFamily,
            fontSize: textFontSize,
            fontWeight: fontWeight,
            description: themeName,
          }),
        });
  
        if (responseTheme.ok) {
          console.log('Theme created successfully');
          const responseData = await responseTheme.json();
          const newThemeId = responseData.id;
  
          console.log('Theme created successfully with ID:', newThemeId);
  
        } else {
          const errorDataTheme = await responseTheme.json(); // Parse the error response
          console.error('Failed to create theme:', errorDataTheme);
  
          // Add additional logging for debugging
          console.log('Full Response Theme:', responseTheme);
        }
      } catch (error) {
        console.error('Error creating theme:', error);
      }
      setPopUpVisible(true);
  };

  const closePopUp = () => {
    setPopUpVisible(false);
  };

  return (
    <div className='Theme'>
      <h1>Themes</h1>
      <div className='ThemeDisplay'>
        <VueTheme
          titleAndTextColor={titleAndTextColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          textFontSize={textFontSize}
        />
        <MakeTheme
          setTitleAndTextColor={setTitleAndTextColor}
          setBackgroundColor={setBackgroundColor}
          setFontFamily={setFontFamily}
          setFontWeight={setFontWeight}
          setTextFontSize={setTextFontSize}
          setThemeName={setThemeName}
          themeName={themeName}
        />
      </div>
      <button className='ButtonTheme' onClick={HandlePublishTheme}>Publier le thème</button>
      {/* Pop-up */}
      {isPopUpVisible && (
        <div className='PopUp'>
          <p>Le thème a été publié avec succès!</p>
          <button onClick={closePopUp}>Fermer</button>
        </div>
      )}
    </div>
  );
};

const VueTheme = (props) => {
  const { titleAndTextColor, backgroundColor, fontFamily, fontWeight, textFontSize } = props;

  const titleAndTextStyle = {
    color: titleAndTextColor,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
  };

  const textStyle = {
    color: titleAndTextColor,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontSize: textFontSize,
  };

  const themeStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className='VueTheme' style={themeStyle}>
      <h1 style={titleAndTextStyle}>Titre</h1>
      <p style={textStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum purus id tincidunt facilisis. Duis
        fringilla, libero et fermentum vulputate, mauris ligula volutpat nulla, id consectetur risus libero id dui.
        Curabitur vel neque vel libero tristique rhoncus.
      </p>
      <img src='/media/site/imageTest.jpg' alt='Une image'></img>
    </div>
  );
};

const MakeTheme = (props) => {
  const {
    setTitleAndTextColor,
    setBackgroundColor,
    setFontFamily,
    setFontWeight,
    setTextFontSize,
  } = props;


  const handleNameChange = (event) => {
    props.setThemeName(event.target.value);
  };

  return (
    <div className='MakeTheme'>
      <label htmlFor='themeName'>Theme name :</label>
      <input
        type='text'
        id=''
        value={props.themeName}
        onChange={handleNameChange}
      />
      <ColorPick label='Text color :' color={setTitleAndTextColor} />
      <ColorPickBack label='Background color :' color={setBackgroundColor} />
      <FontFamilyPick fontFamily={setFontFamily} />
      <FontWeightSelector fontWeight={setFontWeight} />
      <FontSizeSelector fontSize={setTextFontSize} />
    </div>
  );
};


// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------


const ColorPick = ({ label, color }) => {
  const [selectedHexColor, setSelectedHexColor] = useState('#000000');

  const handleColorChange = (event) => {
    const newHexColor = event.target.value;
    setSelectedHexColor(newHexColor);
    color(newHexColor);
  };

  return (
    <div className='ColorPick'>
      {label}
      <input type='color' id={`colorPicker-${label}`} onChange={handleColorChange} value={selectedHexColor} />
    </div>
  );
};

const ColorPickBack = ({ label, color }) => {
  const [selectedHexColor, setSelectedHexColor] = useState('#000000');

  const handleColorChange = (event) => {
    const newHexColor = event.target.value;
    setSelectedHexColor(newHexColor);
    color(newHexColor);
  };

  return (
    <div className='ColorPick'>
      {label}
      <input type='color' id={`colorPicker-${label}`} onChange={handleColorChange} value={selectedHexColor} />
    </div>
  );
};

const FontFamilyPick = ({ fontFamily }) => {
  const [selectedFont, setSelectedFont] = useState('Arial');

  const handleFontChange = (event) => {
    const newFont = event.target.value;
    setSelectedFont(newFont);
    fontFamily(newFont);
  };

  return (
    <div className='FontFamilyPick'>
      <label htmlFor='fontSelector'>Select a font family :</label>
      <select id='fontSelector' value={selectedFont} onChange={handleFontChange}>
        <option value='Arial'>Arial</option>
        <option value='Verdana'>Verdana</option>
        <option value='Georgia'>Georgia</option>
        <option value='Times New Roman'>Times New Roman</option>
        <option value='Courier New'>Courier New</option>
      </select>
    </div>
  );
};

const FontWeightSelector = ({ fontWeight }) => {
  const [selectedWeight, setSelectedWeight] = useState('normal');

  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setSelectedWeight(newWeight);
    fontWeight(newWeight);
  };

  return (
    <div>
      <label htmlFor='fontWeight'>Select a font weight :</label>
      <select
        id='fontWeight'
        name='fontWeight'
        value={selectedWeight}
        onChange={handleWeightChange}
      >
        <option value='normal'>Normal</option>
        <option value='bold'>Gras</option>
        <option value='lighter'>Léger</option>
      </select>
    </div>
  );
};

const FontSizeSelector = ({ fontSize }) => {
  const [selectedSize, setSelectedSize] = useState(16);

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    fontSize(`${newSize}px`);
  };

  return (
    <div>
      <label htmlFor='fontSize'>Select a font size :</label>
      <input
        type='range'
        id='fontSize'
        name='fontSize'
        min='16'
        max='28'
        step='2'
        value={selectedSize}
        onChange={handleSizeChange}
      />
    </div>
  );
};



export default Theme








// import React, { useState,useEffect } from 'react';


// // const [titleColor,setTitleColor] = useState(null);
// // const [titleFontFamily,setTitleFontFamily] = useState(null);
// // const [textColor,setTextColor] = useState(null);
// // const [textFontFamily,setTextFontFamily] = useState(null);



// const Theme = (props) => {
//     return (
//         <div className='Theme'>
//             <h1>Themes</h1>
//             <div className='ThemeDisplay'>
//                 <VueTheme/>
//                 <MakeTheme/>
//             </div>
//             <button className='ButtonTheme'>Publier le thème</button>
//         </div>
//     );
// };

// export default Theme;



// const VueTheme = () => {
//     return (
//         <div className='VueTheme'>
//             <h1>Titre</h1>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum purus id tincidunt facilisis. Duis fringilla, libero et fermentum vulputate, mauris ligula volutpat nulla, id consectetur risus libero id dui. Curabitur vel neque vel libero tristique rhoncus.</p>
//             <img src='/media/site/imageTest.jpg' alt='Une image'></img>
//         </div>
//       );
// }


// const MakeTheme = () => {
//     return (
//         <div className='MakeTheme'>
//             <ColorPick/>
//             <ColorPickBack/>
//             <FontFamilyPick/>
//             <FontWeightSelector/>
//         </div>
//       );
// }



// /************************************** */

// const ColorPick = (props) => {
//     const [selectedHexColor, setSelectedHexColor] = useState('#000000');

//     const handleColorChange = (event) => {
//       const newHexColor = event.target.value;
//       setSelectedHexColor(newHexColor);
//       props.color(newHexColor);
//     };

//     return (
//       <div className="ColorPick">
//         ColorPick
//         <input type="color" id="colorPicker" onChange={handleColorChange} value={selectedHexColor} />
//         <div id="selectedColor">
//           Selected Color: <span id="colorValue">{selectedHexColor}</span>
//         </div>
//       </div>
//     );
//   };


//   /************************************** */

// const ColorPickBack = (props) => {
//   const [selectedHexColor, setSelectedHexColor] = useState('#000000');

//   const handleColorChange = (event) => {
//     const newHexColor = event.target.value;
//     setSelectedHexColor(newHexColor);
//     props.color(newHexColor);
//   };

//   return (
//     <div className="ColorPick">
//       ColorPick
//       <input type="color" id="colorPicker" onChange={handleColorChange} value={selectedHexColor} />
//       <div id="selectedColor">
//         Selected Color: <span id="colorValue">{selectedHexColor}</span>
//       </div>
//     </div>
//   );
// };

// /***************************** */
//   const FontFamilyPick = (props) => {
//     const [selectedFont, setSelectedFont] = useState('Arial');

//     useEffect(() => {
//       const fontSelector = document.getElementById('fontSelector');
//       const sampleText = document.getElementById('sampleText');

//       const handleFontChange = () => {
//         const newFont = fontSelector.value;
//         sampleText.style.fontFamily = newFont;
//         console.log("font changed");
//         setSelectedFont(newFont);
//         props.fontFamily(newFont);
//       };

//       fontSelector.addEventListener('change', handleFontChange);

//       return () => {
//         fontSelector.removeEventListener('change', handleFontChange);
//       };
//     }, []);

//     return (
//       <div className="FontFamilyPick">
//         <label htmlFor="fontSelector">Select Font Family:</label>
//         <select id="fontSelector" value={selectedFont} onChange={() => {}}>
//           <option value="Arial">Arial</option>
//           <option value="Verdana">Verdana</option>
//           <option value="Georgia">Georgia</option>
//           <option value="Times New Roman">Times New Roman</option>
//           <option value="Courier New">Courier New</option>
//         </select>
//         <div id="sampleText">Sample Text</div>
//       </div>
//     );
//   };






// /********************************** */



//   const FontWeightSelector = () => {
//     const [selectedWeight, setSelectedWeight] = useState('normal');
  
//     const handleWeightChange = (e) => {
//       setSelectedWeight(e.target.value);
//     };
  
//     return (
//       <div>
//         <label htmlFor="fontWeight">Sélectionnez la font weight :</label>
//         <select
//           id="fontWeight"
//           name="fontWeight"
//           value={selectedWeight}
//           onChange={handleWeightChange}
//         >
//           <option value="normal">Normal</option>
//           <option value="bold">Gras</option>
//           <option value="bolder">Plus gras</option>
//           <option value="lighter">Plus léger</option>
//           {/* Ajoutez d'autres options selon vos besoins */}
//         </select>
  
//         <p style={{ fontWeight: selectedWeight }}>
//           Exemple de texte avec la font weight sélectionnée.
//         </p>
//       </div>
//     );
//   };