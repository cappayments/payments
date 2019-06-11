import React, {Component} from 'react'
import {connect} from 'react-redux'
import {purchaseItem} from '../store'
import {Button, Card, Icon, Image, Dimmer, Loader} from 'semantic-ui-react'

class Products extends Component {
    constructor() {
        super()
        this.state={
            dimmer: false
        }
        this.loader = this.loader.bind(this)
    }
    
    async purchaseItem(amount) {
        this.loader()
        await this.props.purchasing(amount)
        this.loader()
    }

    loader() {
        this.state.dimmer ? this.setState({
            dimmer: false
        }) : this.setState({
            dimmer: true
        })
    }

    render() {
        return (
            <div>
                <h2>List of Products</h2>
                {
                    this.state.dimmer && (
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    )
                }
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                {
                    data.map(product=>{
                        return (
                            <Card key={product.name} className="productCard">
                                <Image src={product.image} centered={true} style={{height: '270px'}}/>
                                <Card.Content>
                                    <Card.Header>{product.name}</Card.Header>
                                    <Card.Meta>${product.price}</Card.Meta>
                                    <Card.Description>{product.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button color="instagram" onClick={()=>this.purchaseItem(product.price)}>
                                        <Icon name='shopping cart'/> Purchase
                                    </Button>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        purchase: state.purchase
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchasing: price => dispatch(purchaseItem(price)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)

const data = [
    {
        image: "https://postfiles.pstatic.net/MjAxODA0MjVfMjA2/MDAxNTI0NjI0MDc1ODMz.2mmFMOKfKjJOkTAw4Be7qFn8NN5jS80Qm-iYDSxi4-Yg.LYO3WZGVgrcnb7MmJFzN7_Tqo4awbx_ut3a_RzqDiAMg.JPEG.jgjg2016/Red_Play_T-Shirt_%28Black%29-Big_heart.JPG?type=w966",
        price: "19.99",
        name: "T-Shirt A",
        description: "Brand new"
    },{
        image: "https://postfiles.pstatic.net/MjAxODA0MjVfMTk4/MDAxNTI0NjI0MjM1MjYz.0W2ji4ChAVx89SG4u5WXcE7eGv0y_j438uQqRUOtOkYg.ksj52VoJG5a68noBsLG-Uszk0cmZdjz1EK8z42kb8IYg.JPEG.jgjg2016/Red_Play_T-Shirt_%28White%29-2.JPG?type=w966",
        price: "14.99",
        name: "T-Shirt B",
        description: "White Color"
    },{
        image: "https://postfiles.pstatic.net/MjAxODA0MjVfMjcy/MDAxNTI0NjI0MTUwNTk0.60JAhbjZcKodCg3H-XurHG0jWxnZd63PNLeRH-sjDYAg.tQ1fa6W3au68xFytuvqWnM-tmWEwiWxAjUSK5yl-LKQg.JPEG.jgjg2016/Red_Play_T-Shirt_%28Black%2CWhite%29.JPG?type=w966",
        price: "23.45",
        name: "T-Shirt C",
        description: "Skeleton"
    }
]