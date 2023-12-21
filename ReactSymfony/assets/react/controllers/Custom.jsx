import React, { useState, useEffect } from "react";

const Custom = (props) => {

    const [type, setType] = useState(null);

    function CustomTitle(){
        type == 'title' ?  setType(null) : setType('title')
    }

    function CustomText(){
        type == 'text' ?  setType(null) : setType('text')
    }


    return (
        <div className="Custom">
            <button onClick={CustomTitle}>Custom Title</button>
            <button onClick={CustomText}>Custom Text</button>

            {
                type == 'title' ?
                    <>
                        <ColorPick color = {props.setTitleColor} />
                        <FontFamilyPick fontFamily = {props.setTitleFontFamily}/>
                    </>
                :
                null
            }

            {
                type == 'text' ?
                    <>
                        <ColorPick color = {props.setTextColor} />
                        <FontFamilyPick fontFamily = {props.setTextFontFamily}/>
                    </>
                :
                null
            }

        </div>
      );
}



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

    // Cleanup the event listener on component unmount
    return () => {
      fontSelector.removeEventListener('change', handleFontChange);
    };
  }, []); // Empty dependency array ensures the effect runs only once, equivalent to componentDidMount

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






export default Custom;

