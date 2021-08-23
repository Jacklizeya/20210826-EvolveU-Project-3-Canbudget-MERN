import React, { useState } from 'react';
import { DropdownItems } from './DropdownItems';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown(){

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
        <ul
            onClick={handleClick}
            className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
        {DropdownItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => {
                    setClick(false)
                    if (item.callback) {
                        item.callback();
                    }
                }}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
        </ul>
        </>
    )
};

export default Dropdown;