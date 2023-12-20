import React, { useState, useEffect } from 'react';

const Article = (props) => {
    return (
        <div className='Article'>
            Article
            <a href="/article" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</a>

            {/* {
                props.connected == true ?
                :null
            } */}
        </div>
    );
}

export default Article;