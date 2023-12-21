import React, { useState, useEffect } from 'react';


const ToolBox = (props) => {

    function HandleChange(e){
        switch(e.target.value){
            case 'title':
                props.titleBtn == true ? props.setTitleBtn(false) : props.setTitleBtn(true);
                break;
            case 'text':
                props.textBtn == true ? props.setTextBtn(false) : props.setTextBtn(true);
                break;
            case 'image':
                props.imageBtn == true ? props.setImageBtn(false) : props.setImageBtn(true);
                break;
            case 'graph':
                props.graphBtn == true ? props.setGraphBtn(false) : props.setGraphBtn(true);
                break;
        }
    }

    return (
        <div className="ToolBox">
            <h1>Create a bloc</h1>
            <ul>
                {
                    props.titleBtn == true ?
                        <li><button onClick={HandleChange} value={'title'}>Remove Title</button></li>
                    :
                        <li><button onClick={HandleChange} value={'title'}>Add Title</button></li>
                }

                {
                    props.textBtn == true ?
                        <li><button onClick={HandleChange} value={'text'}>Remove Text</button></li>
                    :
                        <li><button onClick={HandleChange} value={'text'}>Add Text</button></li>
                }

                {
                    props.imageBtn == true ?
                        <li><button onClick={HandleChange} value={'image'}>Remove Image</button></li>
                    :
                        <li><button onClick={HandleChange} value={'image'}>Add Image</button></li>

                }

                {
                    props.graphBtn == true ?
                        <li><button onClick={HandleChange} value={'graph'}>Remove Graph</button></li>
                    :
                        <li><button onClick={HandleChange} value={'graph'}>Add Graph</button></li>

                }
            </ul>
        </div>
      );
}

export default ToolBox;