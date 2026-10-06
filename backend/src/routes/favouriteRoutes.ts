import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getUserFavourites } from "../services/favouriteService";

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

export default router;