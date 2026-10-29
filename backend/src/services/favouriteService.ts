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

export async function addFavourite(userId: number, stationId: number) {
  const result = await pool.query(
    `
    INSERT INTO favourite_stations (user_id, station_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [userId, stationId]
  );

  return result.rows[0];
}


export async function removeFavourite(userId: number, stationId: number) {
  const result = await pool.query(
    `
    DELETE FROM favourite_stations
    WHERE user_id = $1 AND station_id = $2
    RETURNING *
    `,
    [userId, stationId]
  );

  return result.rows[0];
}
