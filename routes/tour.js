import express from "express"
const router = express.Router()

import { createTour, deleteTour, getTour, getTourByUser, getTours, updateTour } from "../controllers/tour.js"
import auth from "../middleware/auth.js";


router.post('/', auth, createTour);
router.get('/', getTours);
router.get('/:id', getTour);
router.delete('/:id', auth, deleteTour);
router.patch('/:id', auth, updateTour);
router.get('/userTours/:id', getTourByUser);

export default router;