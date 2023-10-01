export interface Hero {
  id: string;
  alias: string;
  name: string;
  publishing: string;
}

export interface CreateHeroDto {
  alias: string;
  name: string;
  publishing: string;
}
