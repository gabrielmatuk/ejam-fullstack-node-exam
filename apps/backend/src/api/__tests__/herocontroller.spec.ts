import { Test, TestingModule } from '@nestjs/testing';
import { HeroController } from '../controllers/HeroController';
import { HeroService } from '../../core/services/HeroService';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

class MockAuthGuard {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    req.user = { token: 'super_secret' };
    return true;
  }
}

describe('SuperheroController', () => {
  let controller: HeroController;
  let service: HeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [
        {
          provide: HeroService,
          useValue: {
            addSuperHero: jest.fn(),
            getSuperHeroes: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('bearer'))
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<HeroController>(HeroController);
    service = module.get<HeroService>(HeroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addSuperhero', () => {
    it('should add a superhero', () => {
      const createSuperheroDto = {
        name: 'Batman',
        superpower: 'Inteligência',
        humilityScore: 8,
      };

      jest.spyOn(service, 'addSuperHero').mockReturnValue({
        id: 1,
        ...createSuperheroDto,
      });

      const result = controller.addSuperHero(
        createSuperheroDto.name,
        createSuperheroDto.superpower,
        createSuperheroDto.humilityScore,
      );

      expect(result).toEqual({
        id: 1,
        name: 'Batman',
        superpower: 'Inteligência',
        humilityScore: 8,
      });
      expect(service.addSuperHero).toHaveBeenCalledWith(
        'Batman',
        'Inteligência',
        8,
      );
    });
  });

  describe('getSuperheroes', () => {
    it('should return superheroes sorted by humilityScore', () => {
      const mockSuperheroes = [
        { id: 3, name: 'Spider-Man', superpower: 'Agilidade', humilityScore: 9 },
        { id: 1, name: 'Batman', superpower: 'Inteligência', humilityScore: 8 },
        { id: 2, name: 'Superman', superpower: 'Força', humilityScore: 5 },
      ];

      jest.spyOn(service, 'getSuperHeroes').mockReturnValue(mockSuperheroes);

      const result = controller.getSuperHeroes();
      expect(result).toEqual(mockSuperheroes);
      expect(service.getSuperHeroes).toHaveBeenCalled();
    });
  });
});