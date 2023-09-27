//ya que enprincipio no van a tener lógica interna el Hero, decido usar interface en vez de clase

export interface Hero {
  id: number;
  alias: string;
  name?: string;
  birthdate?: Date;
  publishin: string;
}
