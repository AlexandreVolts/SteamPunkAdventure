import { AEnemy } from "./AEnemy";
import enemies from "./../json/enemies.json"

export class Angler extends AEnemy
{
  constructor()
  {
    super('angler', enemies.angler);
  }
}