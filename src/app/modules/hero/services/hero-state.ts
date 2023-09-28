import { Hero } from "src/app/common/models/hero";

export interface HeroState {
  heroList: Hero[];
  heroToEdit: Hero | null;
  totalHeroes: number
}

export const InitialHeroState =  {
  heroList: [],
  heroToEdit: null,
  totalHeroes:0
};
