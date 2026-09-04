const express = require('express');
const router = express.Router();
const c = require('../controllers/reviewController');
router.get('/', c.getReviews);
router.post('/', c.createReview);
router.delete('/:id', c.deleteReview);
module.exports = router;