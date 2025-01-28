import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { HeroService } from '../../core/services/HeroService';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('superheroes')
@Controller('superheroes')
export class HeroController {
  constructor(private readonly userService: HeroService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a superhero' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Batman' },
        superpower: { type: 'string', example: 'Rich' },
        humilityScore: { type: 'number', example: 90 }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'The superhero has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public addSuperHero(
    @Body('name') name: string,
    @Body('superpower') superpower: string,
    @Body('humilityScore') humilityScore: number
  ) {
    return this.userService.addSuperHero(name, superpower, humilityScore)
  }

  @Get()
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all superheroes' })
  @ApiResponse({ status: 200, description: 'Return all superheroes.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public getSuperHeroes() {
    return this.userService.getSuperHeroes()
  }
}
