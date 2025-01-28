import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from '../../core/services/HeroService';
import { ValidationError, NotFoundError } from '../../core/errors/errors';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroService],
    }).compile();

    service = module.get<HeroService>(HeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addSuperhero', () => {
    it('should add a superhero', () => {
      const superhero = service.addSuperHero('Batman', 'rich', 8);
      expect(superhero).toEqual({
        id: 1,
        name: 'Batman',
        superpower: 'rich',
        humilityScore: 8,
      });
    });

    it('should throw ValidationError if required fields are missing', () => {
      expect(() => service.addSuperHero('', '', 0)).toThrow(ValidationError);
    });
  });

  describe('getSuperheroes', () => {
    it('should return superheroes sorted by humilityScore in descending order', () => {
      service.addSuperHero('Batman', 'rich', 8);
      service.addSuperHero('Superman', 'strength', 5);
      service.addSuperHero('Spider-Man', 'agility', 9);

      const superheroes = service.getSuperHeroes();
      expect(superheroes).toEqual([
        { id: 3, name: 'Spider-Man', superpower: 'agility', humilityScore: 9 },
        { id: 1, name: 'Batman', superpower: 'rich', humilityScore: 8 },
        { id: 2, name: 'Superman', superpower: 'strength', humilityScore: 5 },
      ]);
    });

    it('should throw NotFoundError if no superheroes are found', () => {
      expect(() => service.getSuperHeroes()).toThrow(NotFoundError);
    });
  });
});