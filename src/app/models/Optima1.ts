export interface Optima1Request {
  demand: number;
  productionCost: number;
  storageCost: number;
  dailyProductionCapacity: number;
}

export interface Optima1Response {
  optimalCycleFrequency: number;
}
