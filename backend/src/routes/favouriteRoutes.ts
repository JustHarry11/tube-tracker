import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getUserFavourites, addFavourite, removeFavourite } from "../services/favouriteService";

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


router.delete("/:stationId", authenticate, async (req, res) => {
  try {
    const stationId = Number(req.params.stationId);

    if (!Number.isInteger(stationId) || stationId <= 0) {
      return res.status(400).json({
        message: "A valid station ID is required",
      });
    }

    const deletedFavourite = await removeFavourite(
      req.user!.id,
      stationId
    );

    if (!deletedFavourite) {
      return res.status(404).json({
        message: "Favourite not found",
      });
    }

    res.status(200).json({
      message: "Favourite removed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove favourite",
    });
  }
});




export default router;