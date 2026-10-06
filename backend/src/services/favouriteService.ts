import { pool } from "../db/pool";

export async function getUserFavourites(userId: number) {
  const result = await pool.query(
    `
    SELECT stations.id, stations.name
    FROM favourite_stations
    JOIN stations
      ON favourite_stations.station_id = stations.id
    WHERE favourite_stations.user_id = $1
    `,
    [userId]
  );

  return result.rows;
}