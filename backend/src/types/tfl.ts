export interface TflStation {
  id: string;
  name: string;
  modes: string[];
}

export interface TflArrival {
  lineName: string;
  destinationName: string;
  platformName: string;
  timeToStation: number;
}