import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';

class Orders extends Component {
    state= {
        orders: [],
        loading: true,
    }

    componentDidMount(){
        axios.get('http://localhost:8080/order/all').then((response) =>{
            const fetchedOrders= [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        }).catch(error => {
            this.setState({loading: false});
        });
    }
    render () {
        return (
            <div>
                {this.state.orders.map(order => {
                    return (
                        <Order
                        key= {order.id}
                        salad={order.salad} meat={order.meat} cheese={order.cheese}
                        sauce={order.sauce} fullName={order.fullName} phone={order.phone} />
                    );
                })}
            </div>
        );
    }
}

export default Orders;