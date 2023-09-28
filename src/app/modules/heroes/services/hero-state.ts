import { Hero } from "src/app/common/models/hero";

export interface HeroState {
  heroList: Hero[];
  heroToEdit: Hero | null;
}

export const InitialHeroState =  {
  heroList: [],
  heroToEdit: null
};
