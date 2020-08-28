import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from 'axios';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    sauce: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            sauce: 0,
        },

        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        name: "",
        phone: ""
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum,el)=> {
           return sum+el;
        },0);

        this.setState({purchasable: sum>0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type]= updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount>0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }

            updatedIngredients[type]= updatedCount;

            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
        
    }

    purchaseHandler = (fullName, phoneNo) => {
        this.setState({
            purchasing: true,
            name: fullName,
            phone: phoneNo,
        });
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        const data = {
            salad: this.state.ingredients.salad,
            meat: this.state.ingredients.meat,
            cheese: this.state.ingredients.cheese,
            sauce: this.state.ingredients.sauce,
            fullName: this.state.name,
            phone: this.state.phone
        };
        //console.log(data);
        axios.post('http://localhost:8080/order/',data).then((response) =>{
            console.log(response);
            this.props.history.push('/');
        });

        this.setState({
            purchasable: false,
            purchasing: false,
            name: "",
            phone: ""
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients= {this.state.ingredients}
                        price= {this.state.totalPrice} 
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled= {disabledInfo}
                    price={this.state.totalPrice}
                    ordered= {this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    ingredients={this.state.ingredients} />
            </Aux>
        );
    };
};

export default BurgerBuilder;