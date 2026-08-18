import { Router } from 'express';
import { searchStations } from "../services/tflService";

const router = Router();

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query as string;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const stations = await searchStations(query);
        res.json(stations);
    } catch (error) {
        console.error('Error searching stations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;