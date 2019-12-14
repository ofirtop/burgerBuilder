import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./burger.module.css";

const burger = props => {

    let transformedIngredients = Object.keys(props.ingredients).map((type)=>{
        return [...Array(props.ingredients[type])].map((_,index)=>{
            return <BurgerIngredient type={type} key={type+index}/>
        })
    })
    
    let res = transformedIngredients.reduce((acc,currentVal)=>{
        return acc.concat(currentVal);
    },[])
    
    transformedIngredients = res.length ? transformedIngredients : <p>Please start to add ingredients</p>    

    
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
