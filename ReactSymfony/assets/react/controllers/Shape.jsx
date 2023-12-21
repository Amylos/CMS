import React, { useState, useEffect } from 'react';




const Shape = (props) => {

  function HandleChangeTitle(e){
    props.setTitle(e.target.value);
  }

  function HandleChangeText(e){
    props.setTitle(e.target.value);
  }

  return (
    <div className='Shape'>
      {
        props.titleBtn == true ?
          <BlocTitle Handle = {HandleChangeTitle}/>
        :
          null
      }

      {
        props.textBtn == true ?
        <BlocText Handle = {HandleChangeText}/>
      :
        null
      }

      {
        props.imageBtn == true ?
        <BlocImage/>
      :
        null
      }

      {
        props.graphBtn == true ?
        <BlocGraph/>
      :
        null
      }
    </div>
  );
};



/************************************* */



// Composant BlocTitle
const BlocTitle = (props) => {
  return (
    <div>
      <input type='text' style={{ color: 'blue', fontFamily: 'Arial' }} placeholder='title' onChange={props.Handle}></input>
    </div>
  );
};

// Composant BlocText
const BlocText = (props) => {
  return (
    <div>
        <input type='text' placeholder='text' onChange={props.Handle}></input>
    </div>
  );
};

// Composant BlocImage
const BlocImage = (props) => {
  return (
    <div>
      BlocImage
    </div>
  );
};

// Composant BlocGraph
const BlocGraph = (props) => {
  return (
    <div>
      BlocGraph
    </div>
  );
};

/**************************** */





export default Shape;