import axios from 'axios';

const tflApi = axios.create({
    baseURL: 'https://api.tfl.gov.uk',
});

export async function searchStations(query: string) {
    const response = await tflApi.get(
        `/StopPoint/Search/${encodeURIComponent(query)}`
    );

    return response.data.matches
        .filter((station: any) => station.modes.includes('tube'))
        .map((station: any) => ({
            id: station.id,
            name: station.name,
        }));
}

export async function getArrivals(stationId: string) {
    const response = await tflApi.get(
        `/StopPoint/${stationId}/Arrivals`
    );

    return response.data.map((arrival: any) => ({
        lineName: arrival.lineName,
        destinationName: arrival.destinationName,
        platformName: arrival.platformName,
        minutes: Math.ceil(arrival.timeToStation / 60),
    }));
}