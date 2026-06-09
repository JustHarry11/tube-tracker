CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stations (
  id SERIAL PRIMARY KEY,
  tfl_station_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE favourite_stations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  station_id INTEGER NOT NULL,

  FOREIGN KEY (user_id)
    REFERENCES users(id),

  FOREIGN KEY (station_id)
    REFERENCES stations(id)
);