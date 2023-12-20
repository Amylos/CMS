import React, { useState, useEffect } from 'react';
import Shape from "./Shape";
import ToolBox from "./ToolBox";
import Custom from "./Custom";




const Maker = () => {

    const [type,setType] = useState(null);




    return (
        <div className="Maker">
            <ToolBox setType = {setType}/>
            <Shape type = {type}/>
            <Custom/>
        </div>
      );
}

export default Maker;