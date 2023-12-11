import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async upsert(createPlayerDto: CreatePlayerDto) {
    const { email } = createPlayerDto;

    const playerFound = await this.findByEmail(email);

    if (playerFound) {
      this._update(playerFound, createPlayerDto);
    } else {
      this._create(createPlayerDto);
    }
  }

  async findById(_id: string): Promise<Player> {
    const player = this.playerModel.findById(_id);

    if (!player) throw new NotFoundException(`Player with id ${_id} not found`);

    return player;
  }

  async find(): Promise<Player[]> {
    return this.playerModel.find();
  }

  async delete(email: string): Promise<any> {
    return this.playerModel.deleteOne({
      email,
    });
  }

  async findByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({
      email,
    });

    if (!player)
      throw new NotFoundException(`Player with email ${email} not found`);

    return player;
  }

  private _update(player: Player, updatePlayerDto: CreatePlayerDto) {
    return this.playerModel.findOneAndUpdate(
      {
        _id: player._id,
      },
      {
        $set: updatePlayerDto,
      },
    );
  }

  private _create(createPlayerDto: CreatePlayerDto) {
    const playerCreated = new this.playerModel(createPlayerDto);

    return playerCreated.save();
  }
}
