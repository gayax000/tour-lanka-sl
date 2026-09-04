const express = require('express');
const router = express.Router();
const c = require('../controllers/transportController');
router.get('/', c.getTransports);
router.post('/', c.createTransport);
router.delete('/:id', c.deleteTransport);
module.exports = router;