import React from 'react';
import classes from './Logo.module.css';
import BurgerLogo from '../../Assets/Images/burger-logo.png';
    
const Logo = (props)=>(
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="My Delicious Burger"/>
    </div>
)
export default Logo;