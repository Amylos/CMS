import React, { useState,useEffect } from 'react';

const Theme = (props) => {
    return (
        <div className='Theme'>
            <h1>Themes</h1>
            <div className='ThemeDisplay'>
                <VueTheme/>
                <MakeTheme/>
            </div>
            <button className='ButtonTheme'>Publier le thème</button>
        </div>
    );
};

export default Theme;



const VueTheme = () => {
    return (
        <div className='VueTheme'>
            <h1>Titre</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum purus id tincidunt facilisis. Duis fringilla, libero et fermentum vulputate, mauris ligula volutpat nulla, id consectetur risus libero id dui. Curabitur vel neque vel libero tristique rhoncus.</p>
            <img src='/media/site/imageTest.jpg' alt='Une image'></img>
        </div>
      );
}



const MakeTheme = () => {
    return (
        <div className='MakeTheme'>
            <ColorPick/>
            <FontFamilyPick/>
            <FontWeightSelector/>
        </div>
      );
}



/************************************** */

const ColorPick = (props) => {
    const [selectedHexColor, setSelectedHexColor] = useState('#000000');

    const handleColorChange = (event) => {
      const newHexColor = event.target.value;
      setSelectedHexColor(newHexColor);
      props.color(newHexColor);
    };

    return (
      <div className="ColorPick">
        ColorPick
        <input type="color" id="colorPicker" onChange={handleColorChange} value={selectedHexColor} />
        <div id="selectedColor">
          Selected Color: <span id="colorValue">{selectedHexColor}</span>
        </div>
      </div>
    );
  };

/***************************** */
  const FontFamilyPick = (props) => {
    const [selectedFont, setSelectedFont] = useState('Arial');

    useEffect(() => {
      const fontSelector = document.getElementById('fontSelector');
      const sampleText = document.getElementById('sampleText');

      const handleFontChange = () => {
        const newFont = fontSelector.value;
        sampleText.style.fontFamily = newFont;
        console.log("font changed");
        setSelectedFont(newFont);
        props.fontFamily(newFont);
      };

      fontSelector.addEventListener('change', handleFontChange);

      return () => {
        fontSelector.removeEventListener('change', handleFontChange);
      };
    }, []);

    return (
      <div className="FontFamilyPick">
        <label htmlFor="fontSelector">Select Font Family:</label>
        <select id="fontSelector" value={selectedFont} onChange={() => {}}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
        <div id="sampleText">Sample Text</div>
      </div>
    );
  };






/********************************** */



  const FontWeightSelector = () => {
    const [selectedWeight, setSelectedWeight] = useState('normal');
  
    const handleWeightChange = (e) => {
      setSelectedWeight(e.target.value);
    };
  
    return (
      <div>
        <label htmlFor="fontWeight">Sélectionnez la font weight :</label>
        <select
          id="fontWeight"
          name="fontWeight"
          value={selectedWeight}
          onChange={handleWeightChange}
        >
          <option value="normal">Normal</option>
          <option value="bold">Gras</option>
          <option value="bolder">Plus gras</option>
          <option value="lighter">Plus léger</option>
          {/* Ajoutez d'autres options selon vos besoins */}
        </select>
  
        <p style={{ fontWeight: selectedWeight }}>
          Exemple de texte avec la font weight sélectionnée.
        </p>
      </div>
    );
  };