import express from 'express';

import { CreateReview, 
        GetAllReviews, 
        UpdateReview, 
        DeleteReview} from '../controller/review.js';

const router = express.Router();

router
.route('/')
.post(CreateReview)
.get(GetAllReviews);


router
.route('/:id')
.put(UpdateReview)
.delete(DeleteReview);


export default router;
