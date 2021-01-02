const router = require('express').Router();

//Import controller
const AppController = require('../controllers/app')



router.post('/app',AppController.create);

router.get('/myapp/:appSlug/:model/:number',AppController.schemaMiddleware, AppController.get)

router.post('/myapp/:appSlug/:model',AppController.schemaMiddleware, AppController.post)

router.patch('/myapp/:appSlug/:model/',AppController.schemaMiddleware, AppController.patch)

router.delete('/myapp/:appSlug/:model/',AppController.schemaMiddleware, AppController.delete)

module.exports = router;