import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/heathRoutes';
import authRoutes from './routes/authRoutes';
import stationRoutes from './routes/stationRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);


export default app;