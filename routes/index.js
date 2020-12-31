const router = require('express').Router();
// const routeName = require('./routeLocation)

router.get('/hello',async (req,res,next)=> {

    res.status(200).json({message:"The frontend is connected to backend"})
})
// router.use('route',routeName)

module.exports = router;