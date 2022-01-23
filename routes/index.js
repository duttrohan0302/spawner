const router = require('express').Router();
const path = require('path')
const cors = require('cors')
const app = require('./app')

router.get('/hello',async (req,res,next)=> {
    res.status(200).json({message:"The frontend is connected to backend"})
})

app.use(cors())
router.use('/',app)

module.exports = router;