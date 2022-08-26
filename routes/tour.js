import express from "express"
const router = express.Router()

import { createTour, getTour, getTours } from "../controllers/tour.js"
import auth from "../middleware/auth.js";


router.post('/', createTour);
router.get('/', getTours);
router.get('/:id', getTour);

export default router;