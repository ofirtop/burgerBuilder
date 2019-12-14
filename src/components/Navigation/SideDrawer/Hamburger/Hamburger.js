import React from 'react'
import Hamburger from '../../../../Assets/Images/hamburger.jpg';
import classes from './Hamburger.module.css';

const hamburger = (props)=>(
    <div className={classes.Hamburger} onClick={props.openSideDrawer}>
        <img src={Hamburger} alt="menu icon"/>
    </div>
)

export default hamburger