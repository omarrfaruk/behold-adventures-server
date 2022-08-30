import mongoose from 'mongoose';
import TourModal from '../models/tour.js'

export const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new TourModal({
        ...tour,
        creator: req.userId,
        createdAt: new Date().toString()
    });

    try {
        await newTour.save();
        res.status(201).json(newTour)
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

export const getTours = async (req, res) => {
    try {
        const tours = await TourModal.find()
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

export const getTour = async (req, res) => {
    const { id } = req.params;
    try {
        const tour = await TourModal.findById(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

export const getTourByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'User Does not Exist' })
    }
    const userTours = await TourModal.find({ creator: id })
    res.status(200).json(userTours)
}

export const deleteTour = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: 'No Tour Exist With this User' })
        }

        await TourModal.findByIdAndRemove(id)
        res.json({ message: 'Tour Deleted Successfully' })
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

export const updateTour = async (req, res) => {
    const { id } = req.params;
    const { title, imageFile, tags, creator, description } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: 'No Tour Exist With this User' })
        }

        const updatedTour = {
            title,
            imageFile,
            tags,
            creator,
            description,
            _id: id
        }

        await TourModal.findByIdAndUpdate(id, updatedTour, { new: true })
        res.json(updatedTour)
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}