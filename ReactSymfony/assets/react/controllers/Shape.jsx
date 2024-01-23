import React, { useState, useEffect } from 'react';
import Chart from './Chart';


const Shape = (props) => {

  function HandleChangeTitle(e){
    props.setTitle(e.target.value);
  }

  function HandleChangeText(e){
    props.setText(e.target.value);
  }

  return (
    <div className='Shape' >
      {
        props.titleBtn == true ?
          <BlocTitle Handle = {HandleChangeTitle} data = {props}/>
        :
          null
      }

      {
        props.textBtn == true ?
        <BlocText Handle = {HandleChangeText} data = {props}/>
      :
        null
      }

      {
        props.imageBtn == true ?
        <BlocImage data = {props}/>
      :
        null
      }

      {
        props.graphBtn == true ?
        <BlocGraph data = {props}/>
      :
        null
      }
      <button onClick={props.HandlePublish}>Publish</button>
    </div>
  );
};


/************************************* */
/************************************* */



// Composant BlocTitle
const BlocTitle = (props) => {
  return (
    <div className='BlocText'>
      {
        props.data.title ?
        <input type='text' value={props.data.title} style={{ color: props.data.textColor, fontFamily: props.data.fontFamily, fontWeight : props.data.fontWeight, fontSize : props.data.fontSize }} placeholder='title' onChange={props.Handle}></input>
        :
        <input type='text' style={{ color: props.data.textColor, fontFamily: props.data.fontFamily, fontWeight : props.data.fontWeight, fontSize : props.data.fontSize }} placeholder='title' onChange={props.Handle}></input>
      }
    </div>
  );
};

// Composant BlocText
const BlocText = (props) => {
  console.log('BLoc : ',props.data.text);
  return (
    <div className='BlocText'>
    {
      props.data.text ?
      <input type='text' value={props.data.text} style={{ color: props.data.textColor, fontFamily: props.data.fontFamily, fontWeight : props.data.fontWeight, fontSize : props.data.fontSize }} placeholder='text' onChange={props.Handle}></input>
      :
      <input type='text' style={{ color: props.data.textColor, fontFamily: props.data.fontFamily, fontWeight : props.data.fontWeight, fontSize : props.data.fontSize }} placeholder='text' onChange={props.Handle}></input>
    }
    </div>
  );
};

// Composant BlocImage
const BlocImage = (props) => {
  return (
    <div>
          {
            props.data.image ?
              <img src={`/media/images/${props.data.image}`} alt={`Image ${props.data.image}`} />
            :
              null
          }
    </div>
  );
};

// Composant BlocGraph
const BlocGraph = (props) => {
  console.log("BlocGraph : ", props.data);

  return (
    <div>
      <Chart graph = {props.data.graph} setGraphType = {props.data.setGraphType}/>
    </div>
  );
};


export default Shape;