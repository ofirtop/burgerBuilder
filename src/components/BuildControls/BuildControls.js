import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Salad',type:'salad'}
];

const buildControls = (props) =>(        
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
                <BuildControl 
                    label={ctrl.label} 
                    key={ctrl.label}
                    addIngredient={()=>props.addIngredient(ctrl.type)}
                    removeIngredient={()=>props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
            ))
        }
        <button 
                className={classes.OrderButton} 
                onClick={props.enterOrderMode}
                disabled={!props.purchasable}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
    </div>
)

export default buildControls