import express from 'express';

import { createReview, 
        getAllReviews, 
        updateReview, 
        deleteReview} from '../controller/review.js';

const router = express.Router();

router
.route('/')
.post(createReview)
.get(getAllReviews);


router
.route('/:id')
.put(updateReview)
.delete(deleteReview);


export default router;

