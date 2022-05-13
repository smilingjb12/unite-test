
export interface MainStatItem {
  country: string;
  total: number;
  working: number;
  planning: number;
  temporary: number;
}

export interface StatusCount {
  statusName: string;
  count: number;
}

export interface SourceStatItem {
  fullName: string;
  country: string;
  city: string;
  statusName: string;
}

export interface PieChartItem {
  name: string;
  value: number;
}