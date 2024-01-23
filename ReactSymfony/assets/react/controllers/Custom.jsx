import React, { useState, useEffect } from "react";

const Custom = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataThemes, setDataThemes] = useState([]);
  const [error, setError] = useState(null);

  console.log("Custom :", props);
  useEffect(() => {
    const fetchDataThemes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/themes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataThemes(result["hydra:member"]);
        console.log("Themes Data : ",result["hydra:member"]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataThemes();

  }, []);


  function SelectTheme(id,backgroundColor,textColor,fontFamily,fontSize,fontWeight,noTheme){

    if(noTheme){
      props.selectedTheme(null)
      props.setBackgroundColor(null);
      props.setTextColor(null);
      props.setFontFamily(null);
      props.setFontSize(null);
      props.setFontWeight(null);

    }
    else{
      props.setSelectedTheme(id);
      props.setBackgroundColor(backgroundColor);
      props.setTextColor(textColor);
      props.setFontFamily(fontFamily);
      props.setFontSize(fontSize);
      props.setFontWeight(fontWeight);
    }




  }

  return (
    <div className="Custom">
      <h1>Select a Theme</h1>
      <ul>
        {
          dataThemes.map((theme) =>(
              <button onClick={() => SelectTheme(theme.id,theme.backgroundColor,theme.textColor,theme.fontFamily,theme.fontSize,theme.fontWeight,null)}>{theme.description}</button>
          ))
        }
        <button onClick={() => {SelectTheme(null,null,null,null,null,null,1)}}>No Theme</button>
      </ul>
    </div>
  );
};

export default Custom;

