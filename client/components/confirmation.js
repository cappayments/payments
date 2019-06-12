import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {Card} from 'semantic-ui-react'

class Confirmation extends Component {
    render() {
        const purchase =  this.props.purchase
        return (
            <div>
                <Card>
                    <Card.Content>
                        <Card.Header><h2>Purchase Complete!</h2></Card.Header>
                        <h3>You're order is on its way</h3>
                        <p>Please allow for 3-5 business days</p>
                        {
                            purchase.name && (
                                <Card.Meta>
                                    Item: {purchase.name}
                                    <br/>
                                    price: {purchase.price}
                                </Card.Meta>
                            )
                        }
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        purchase: store.getState().purchase
    }
}

export default connect(mapStateToProps, null)(Confirmation)