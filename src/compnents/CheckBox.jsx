import '../screens/styles/componentStyle.scss';
import React, { useState } from 'react';


function CheckBox({handleSelectForGroup, id}) {
    const [show , setshow] =  useState(false);
    const handleCheckBox = function(e) {
        e.stopPropagation();
        if(!show) {
            handleSelectForGroup(id , true);
            setshow(true);
        }
        else {
            handleSelectForGroup(id , false);
            setshow(false);
        }
    }
    return (
        <label >
            <input type="checkbox" />
            <span className="checkbox" onClick={handleCheckBox}>
                <svg style={{display: show ? 'block' : 'none'}} width="20" height="20" fill="none" stroke="#fff"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6 9 17l-5-5"></path>
                </svg>
            </span>
        </label>
    )
}

export default CheckBox;