import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getUserFavourites, addFavourite } from "../services/favouriteService";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const favourites = await getUserFavourites(req.user!.id);

    res.json(favourites);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get favourites",
    });
  }
});



router.post("/", authenticate, async (req, res) => {
  try {
    const { stationId } = req.body;

    if (typeof stationId !== "number" || !Number.isInteger(stationId)) {
      return res.status(400).json({
        message: "A valid station ID is required",
      });
    }

    const favourite = await addFavourite(req.user!.id, stationId);

    res.status(201).json(favourite);
  } catch (error) {
    console.error(error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return res.status(409).json({
        message: "This station is already in your favourites",
      });
    }

    res.status(500).json({
      message: "Failed to add favourite",
    });
  }
});



export default router;