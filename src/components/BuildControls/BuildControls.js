import React, {Component} from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Sauce', type: 'sauce'}
    
];

class BuildControls extends Component {
    state = {
        fullName: "",
        phone: "",
    };
    orderedHandler= () =>{
        this.props.ordered(this.state.fullName,this.state.phone);
    }
    render(){
        return(
            <div className = {classes.BuildControls}>
                <p>Current Price: <strong>USD {this.props.price.toFixed(2)}</strong></p>
                {controls.map((ctrl) => (
                    <BuildControl 
                        key = {ctrl.label} 
                        label={ctrl.label} 
                        added={() => this.props.ingredientAdded(ctrl.type)}
                        removed={() => this.props.ingredientRemoved(ctrl.type)}
                        disabled= {this.props.disabled[ctrl.type]}
                        cnt= {this.props.ingredients[ctrl.type]}/>
                ))} 
    
                <label><strong>Your Name</strong></label>
                <input 
                    type="text"
                    placeholder= "Enter your name"
                    value={this.state.fullName} 
                    onChange={(event) => this.setState({fullName: event.target.value})} />
                <label><strong>Your Phone Number</strong></label>
                <input 
                    type="text" 
                    placeholder= "Enter your phone number"
                    value={this.state.phone} 
                    onChange={(event) => this.setState({phone: event.target.value})} />
                <button 
                    className={classes.OrderButton}
                    disabled={!this.props.purchasable}
                    onClick={this.orderedHandler}>ORDER NOW</button>
            </div>
        );
    }
}

    

export default BuildControls;