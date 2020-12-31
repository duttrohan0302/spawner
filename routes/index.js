const router = require('express').Router();
const path = require('path')
// const routeName = require('./routeLocation)

router.get('/hello',async (req,res,next)=> {
    res.status(200).json({message:"The frontend is connected to backend"})
})
// router.use('route',routeName)

if(process.env.NODE_ENV ==="production"){
    router.use(function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}



module.exports = router;