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