const router = require('express').Router()
module.exports = router

const data = {}

router.get('/:payment/:id', async (req, res, next) => {
    try {
        data.payment = req.params.payment
        data.payerId = req.params.id
        console.log(data)
        // console.log("response", req.session)
        res.json({test: "success"})
    } catch(err) {
        next(err)
    }
})

router.get('/getInfo', async (req, res, next) => {
    try {
        res.json(data)
    } catch(err) {
        next(err)
    }
})