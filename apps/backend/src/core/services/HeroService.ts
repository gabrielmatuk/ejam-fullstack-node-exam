import { Injectable } from '@nestjs/common';
import { Superhero } from '../types';
import { NotFoundError, ValidationError } from '../errors/errors';


@Injectable()
export class HeroService {
  private superHeroes: Superhero[] = []
  private nextId: number = 1;

  public addSuperHero(name: string, superpower: string, humilityScore: number): Superhero {
    if (!name || !superpower || !humilityScore) {
      throw new ValidationError('Superhero must have a name, superpower, and humilityScore')
    }
    const newHero = { id: this.nextId, name, superpower, humilityScore }
    this.superHeroes.push(newHero)
    this.nextId++
    return newHero
  }

  public getSuperHeroes(): Superhero[] {
    if (this.superHeroes.length === 0) {
      throw new NotFoundError('No superheroes found')
    }
    return this.superHeroes.sort((a, b) => b.humilityScore - a.humilityScore)
  }
}
