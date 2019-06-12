import React, {Component} from 'react'
import {connect} from 'react-redux'
import PaypalBtn from 'react-paypal-express-checkout'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {purchaseItem} from '../store'
import {Button, Card, Icon, Image, Dimmer, Loader, Popup, Grid, Header} from 'semantic-ui-react'

class Products extends Component {
    constructor() {
        super()
        this.state={
            dimmer: false,
            isOpen: false,
        }
        this.loader = this.loader.bind(this)
        this.onToken = this.onToken.bind(this)
        this.typeConvert = this.typeConvert.bind(this)
    }
    
    async purchaseItem(name, amount) {
        this.loader()
        // await this.props.purchasing(name, amount)
        // window.open('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1XN93032SH883373D', '_self')
        this.loader()
    }

    onToken(name, amount) {
        return async token => {
            this.loader()
            try {
                const {data} = await axios.post('http://10.148.53.29:8086/charge', {
                    amount,
                    stripeToken: token.id,
                    currency: 'USD'
                })
                this.loader()
                console.log(`Transaction is ${data.status}! amount: ${data.amount}`)
                this.props.purchasing(name, amount)
                this.props.history.push('/confirmation')
            } catch(err) {
                this.loader()
                console.error("payment failed!")
                console.error(err)
            }
        }
    }

    loader() {
        this.state.dimmer ? this.setState({
            dimmer: false
        }) : this.setState({
            dimmer: true
        })
    }

    typeConvert(num) {
        const arr = num.toString().split('')
        const convert = arr.filter(ele=>{
          return ele !== '.'
        })
        return parseInt(convert.join(''))
    }

    render() {
        const client = {
            sandbox: "jasonsandbox@yahoo.com",
            production: "QM4K5HLBABEMN"
        }
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
                                    <Popup wide flowing trigger={<Button color="instagram"><Icon name="shopping cart" />Purchase</Button>} on='click' position='bottom center'>
                                        <Grid divided columns={2}>
                                            <Grid.Column textAlign='center'>
                                                <Header>Paypal</Header>
                                                <p style={{width: "200px"}}></p>
                                                <PaypalBtn client={client} currency={'USD'} total={1.00}/>
                                            </Grid.Column>
                                            <Grid.Column textAlign='center'>
                                                <Header>Credit Card</Header>
                                                <StripeCheckout
                                                    token={this.onToken(product.name, this.typeConvert(product.price))}
                                                    stripeKey="pk_test_XazgDFC8qIBiyb8bVNNDWmJm00lA6SuOmT"
                                                    amount={this.typeConvert(product.price)}
                                                    currency="USD"
                                                />
                                            </Grid.Column>
                                        </Grid>
                                    </Popup>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
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
        purchasing: (name, price) => dispatch(purchaseItem(name, price)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)

const data = [
    {
        image: "https://postfiles.pstatic.net/MjAxODA0MjVfMjA2/MDAxNTI0NjI0MDc1ODMz.2mmFMOKfKjJOkTAw4Be7qFn8NN5jS80Qm-iYDSxi4-Yg.LYO3WZGVgrcnb7MmJFzN7_Tqo4awbx_ut3a_RzqDiAMg.JPEG.jgjg2016/Red_Play_T-Shirt_%28Black%29-Big_heart.JPG?type=w966",
        price: 19.99,
        name: "T-Shirt A",
        description: "Brand new"
    },{
        image: "https://postfiles.pstatic.net/MjAxODA0MjVfMTk4/MDAxNTI0NjI0MjM1MjYz.0W2ji4ChAVx89SG4u5WXcE7eGv0y_j438uQqRUOtOkYg.ksj52VoJG5a68noBsLG-Uszk0cmZdjz1EK8z42kb8IYg.JPEG.jgjg2016/Red_Play_T-Shirt_%28White%29-2.JPG?type=w966",
        price: 14.99,
        name: "T-Shirt B",
        description: "White Color"
    },{
        image: "https://postfiles.pstatic.net/MjAxODA0MjVfMjcy/MDAxNTI0NjI0MTUwNTk0.60JAhbjZcKodCg3H-XurHG0jWxnZd63PNLeRH-sjDYAg.tQ1fa6W3au68xFytuvqWnM-tmWEwiWxAjUSK5yl-LKQg.JPEG.jgjg2016/Red_Play_T-Shirt_%28Black%2CWhite%29.JPG?type=w966",
        price: 23.45,
        name: "T-Shirt C",
        description: "Skeleton"
    }
]