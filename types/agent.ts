import type { City } from "./property";

export type Agent = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  markets: City[];
  languages: string[];
  active: boolean;
};

