export interface Hero {
  id: string;
  alias: string;
  name?: string;
  publishin: string;
}

export interface CreateHeroDto {
  alias: string;
  name?: string;
  publishin: string;
}
