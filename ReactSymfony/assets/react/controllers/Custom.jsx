import React from "react";

const Custom = () => {
    return (
        <div className="Custom">
            <ColorPick/>
            <FontPick/>
        </div>
      );
}



const ColorPick = () => {

    const colorValue = 0;
document.addEventListener('DOMContentLoaded', function() {
  const colorPicker = document.getElementById('colorPicker');
  const selectedColor = document.getElementById('selectedColor');
  const colorValue = document.getElementById('colorValue');

  colorPicker.addEventListener('input', function(event) {
    const selectedHexColor = event.target.value;
    selectedColor.style.backgroundColor = selectedHexColor;
    colorValue.textContent = selectedHexColor;
    console.log(colorValue)
  });
});

    return (
        <div className="ColorPick">
            ColorPick
            <input type="color" id="colorPicker" />
            <div id="selectedColor">Selected Color: <span id="colorValue">#000000</span></div>

        </div>
      );
}


const FontPick = () => {

    document.addEventListener('DOMContentLoaded', function() {
        const fontSelector = document.getElementById('fontSelector');
        const sampleText = document.getElementById('sampleText');

        fontSelector.addEventListener('change', function() {
          const selectedFont = fontSelector.value;
          sampleText.style.fontFamily = selectedFont;
        });
      });

    return (
        <div className="FontPick">
 <label for="fontSelector">Select Font Family:</label>
  <select id="fontSelector">
    <option value="Arial">Arial</option>
    <option value="Verdana">Verdana</option>
    <option value="Georgia">Georgia</option>
    <option value="Times New Roman">Times New Roman</option>
    <option value="Courier New">Courier New</option>
  </select>


  <div id="sampleText">Sample Text</div>

  </div>
      );
}



export default Custom;

