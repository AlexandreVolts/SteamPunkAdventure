import { AEnemy } from "./AEnemy";
import enemies from "./../json/enemies.json";

export class NightAngler extends AEnemy
{
  constructor()
  {
    super('night-angler', enemies["night-angler"]);
  }
}