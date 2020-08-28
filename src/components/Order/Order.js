import React from 'react';

import classes from './Order.css';

const order = (props) => (
    <div className= {classes.Order}>
        <p>Name: {props.fullName}</p>
        <p>Contact: {props.phone}</p>
        <p>Ingredients: 
            <span>Salad ({props.salad})</span> 
            <span>Meat ({props.meat})</span> 
            <span>Cheese ({props.cheese})</span> 
            <span>Sauce ({props.sauce})</span></p>
    </div>
);

export default order;