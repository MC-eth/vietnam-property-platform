import type { City } from "@/types/property";

export const CITIES: City[] = ["Ho Chi Minh City", "Hanoi"];

export const DISTRICTS_BY_CITY: Record<City, string[]> = {
  "Ho Chi Minh City": ["Thu Thiem", "Ben Nghe", "Phu My Hung"],
  Hanoi: ["Tay Ho", "Nam Tu Liem", "Hoan Kiem"],
};

export const DISTRICTS = Object.values(DISTRICTS_BY_CITY).flat();

