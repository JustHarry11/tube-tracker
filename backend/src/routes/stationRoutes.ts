import { Router } from 'express';
import axios from 'axios';
import { searchStations, getArrivals } from "../services/tflService";

const router = Router();

router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;

        if (typeof query !== "string" || query.trim() === "") {
            return res.status(400).json({
                message: "Search query is required",
            });
        }

        const stations = await searchStations(query);

        res.json(stations);
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
            return res.status(502).json({
                message: "Unable to search stations using TfL",
            });
        }

        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

router.get("/:stationId/arrivals", async (req, res) => {
    try {
        const { stationId } = req.params;

        if (!stationId || stationId.trim() === "") {
            return res.status(400).json({
                message: "Station ID is required",
            });
        }

        const arrivals = await getArrivals(stationId);

        res.json(arrivals);
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
            return res.status(502).json({
                message: "Unable to get arrivals from TfL",
            });
        }

        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

export default router;