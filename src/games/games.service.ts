import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './game.entity';
import { CreateGameDto } from './dtos/create-game.dto';

@Injectable()
export class GamesService {
  // TODO delete after db implementation
  private readonly games: Game[] = [
    {
      gameId: 'asd123',
      adminId: '1234a',
      name: 'Taliban dummy',
      active: true,
      info: 'Testing game',
      dates: ['1977-06-08', '1978-07-14', '2005-02-03', '2009-10-01'],
      minWeightLoss: 0.1,
      weightUnit: 'kg',
      fee: 10,
      currency: 'BRL',
      vacationLength: 4,
      members: [],
    },
    {
      gameId: 'zxc123',
      adminId: '1234b',
      name: 'Taliban inactive',
      active: false,
      info: 'Testing inactive game',
      dates: ['1977-06-08', '1978-07-14', '2005-02-03', '2009-10-01'],
      minWeightLoss: 0.1,
      weightUnit: 'kg',
      fee: 10,
      currency: 'BRL',
      vacationLength: 4,
      members: [],
    },
  ];

  async create(game: CreateGameDto): Promise<Game> {
    const newGame = new Game({
      ...game,
      gameId: 'lkj098',
      active: true,
      members: [],
    });
    return newGame;
  }

  async find(query: string): Promise<Game[]> {
    const games = this.games.filter((game) => game.name.includes(query));
    return games;
  }

  async findOne(id: string): Promise<Game | undefined> {
    const game: Game = this.games.find((game) => game.gameId === id);
    // TODO verify how the db server respond to a not found
    if (!game) {
      throw new NotFoundException('game not found');
    }
    return game;
  }

  async update(id: string, attrs: Partial<Game>): Promise<Game | undefined> {
    const game = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!game) {
      throw new NotFoundException('user not found');
    }
    Object.assign(game, attrs);
    return game;
  }

  async remove(id: string): Promise<Game | undefined> {
    const game = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!game) {
      throw new NotFoundException('user not found');
    }
    return game;
  }
}