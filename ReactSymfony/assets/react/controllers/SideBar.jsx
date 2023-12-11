import React from 'react';


const SideBar = () => {
    return (
        <div className='SideBar'>

            <a href="/article" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Article</a>
            <p>Media</p>
            <p>Data CSV</p>
            <p>Theme</p>

        </div>
      );
}

export default SideBar;