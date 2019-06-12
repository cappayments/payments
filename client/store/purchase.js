import axios from 'axios'

const PURCHASE_ITEM = 'PURCHASE_ITEM'

const initialState = {}

const goPurchase = item => {
    return {
        type: PURCHASE_ITEM,
        item
    }
}

export const purchaseItem = (name, price) => async dispatch => {
    try {
        // const res = await axios.post('http://10.148.53.47:4200/paypal/make/payment',{
        //     sum: price
        // })
        const data = {
            name,
            price,
        }
        dispatch(goPurchase(data))
    } catch(err) {
        console.error(err)
    }
}

const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
      case PURCHASE_ITEM:
        return action.item
      default:
        return state
    }
  }

export default purchaseReducer