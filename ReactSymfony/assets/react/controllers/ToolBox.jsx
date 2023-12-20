import React, { useState, useEffect } from 'react';


const ToolBox = (props) => {

    function CreateBloc(e){
        props.setType(e.target.value);
    }

    return (
        <div className="ToolBox">
            <h1>Create a bloc</h1>
            <ul>
                <li><button onClick={CreateBloc} value={'title'}>Title</button></li>
                <li><button onClick={CreateBloc} value={'text'}>Text</button></li>
                <li><button onClick={CreateBloc} value={'image'}>Image</button></li>
                <li><button onClick={CreateBloc} value={'graph'}>Graph</button></li>
            </ul>
        </div>
      );
}

export default ToolBox;