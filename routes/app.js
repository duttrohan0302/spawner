const router = require('express').Router();

//Import controller
const AppMiddleware = require('../middlewares/schemaMiddleware')
const AppController = require('../controllers/app')



router.post('/app',AppController.create);

router.get('/myapp/:appSlug/:model/:number',AppMiddleware.schemaMiddleware, AppController.get)

router.post('/myapp/:appSlug/:model',AppMiddleware.schemaMiddleware, AppController.post)

router.patch('/myapp/:appSlug/:model/',AppMiddleware.schemaMiddleware, AppController.patch)

router.delete('/myapp/:appSlug/:model/',AppMiddleware.schemaMiddleware, AppController.delete)

module.exports = router;