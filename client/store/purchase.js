import axios from 'axios'

const PURCHASE_ITEM = 'PURCHASE_ITEM'

const initialState = {}

const goPurchase = price => {
    return {
        type: PURCHASE_ITEM,
        price
    }
}

export const purchaseItem = price => async dispatch => {
    try {
        const res = await axios.post('http://10.148.53.47:4200/paypal/make/payment',{
            sum: price
        })
        console.log(res.data)
        dispatch(goPurchase(price))
    } catch(err) {
        console.error(err)
    }
}

const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
      case PURCHASE_ITEM:
        return action.price
      default:
        return state
    }
  }

export default purchaseReducer