import axios from 'axios';
import { TflStation, TflArrival } from '../types/tfl';

const tflApi = axios.create({
    baseURL: 'https://api.tfl.gov.uk',
});

export async function searchStations(query: string) {
    const response = await tflApi.get<{ matches: TflStation[] }>(
        `/StopPoint/Search/${encodeURIComponent(query)}`
    );

    return response.data.matches
        .filter((station) => station.modes.includes('tube'))
        .map((station) => ({
            id: station.id,
            name: station.name,
        }));
}

export async function getArrivals(stationId: string) {
    const response = await tflApi.get<TflArrival[]>(
        `/StopPoint/${stationId}/Arrivals`
    );

    return response.data.map((arrival) => ({
        lineName: arrival.lineName,
        destinationName: arrival.destinationName,
        platformName: arrival.platformName,
        minutes: Math.ceil(arrival.timeToStation / 60),
    }));
}