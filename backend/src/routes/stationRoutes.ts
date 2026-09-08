import { Router } from 'express';
import { searchStations, getArrivals } from "../services/tflService";

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
        console.error(error);
        res.status(500).json({ message: 'Search query is required' });
    }
});

router.get('/:stationId/arrivals', async (req, res) => {
    try {
        const { stationId } = req.params;

        const arrivals = await getArrivals(stationId);

        res.json(arrivals);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get arrivals' });
    }
});

export default router;