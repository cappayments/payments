import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {completePaypal} from '../store'
import {Button, Dimmer, Loader} from 'semantic-ui-react'

class PaymentComplete extends Component {
    constructor() {
        super()
        this.state = {
            dimmer: false
        }
        this.complete = this.complete.bind(this)
        this.loader = this.loader.bind(this)
    }

    async complete() {
        this.loader()
        const {data} = await axios.get('/api/payment/getInfo')
        console.log(data)
        await this.props.completePaypal(data)
        this.props.history.push('/confirmation')
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
                {
                    this.state.dimmer && (
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    )
                }
                <Button color="olive" onClick={this.complete}>Click here to Complete your order</Button>
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        completePaypal: info => dispatch(completePaypal(info)),
    }
}

export default connect(null, mapDispatch)(PaymentComplete)