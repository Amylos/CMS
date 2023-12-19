import React, { useState, useEffect } from 'react';
import Shape from "./Shape";
import ToolBox from "./ToolBox";
import Custom from "./Custom";




const Maker = () => {
    return (
        <div className="Maker">
            <ToolBox/>
            <Shape/>
            <Custom/>
        </div>
      );
}

export default Maker;