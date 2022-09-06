import express from "express"
const router = express.Router()

import { createTour, deleteTour, getTour, getRelatedTours, getToursBySearch, getTourByUser, getTours, updateTour, getToursByTags } from "../controllers/tour.js"
import auth from "../middleware/auth.js";


router.get('/', getTours);
router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTags);
router.post("/relatedTours", getRelatedTours);
router.get('/:id', getTour);


router.post('/', auth, createTour);
router.delete('/:id', auth, deleteTour);
router.patch('/:id', auth, updateTour);
router.get('/userTours/:id', auth, getTourByUser);

export default router;