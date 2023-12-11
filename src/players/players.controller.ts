import { Controller, Post, Body, Get, Delete, Param, Query } from '@nestjs/common';
import { CreatePlayerDto } from "./dtos/create-player.dto";
import { PlayersService } from "./players.service";
import { Player } from "./interfaces/player.interface";
import { PlayersValidationPipe } from "./pieps/players-validation.pipe";

@Controller('api/v1/players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService
  ) {
  }

  @Post()
  async upsert(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.upsert(createPlayerDto);
  }

  @Get()
  async find(): Promise<Player[]> {
    return this.playersService.find()
  }

  @Delete()
  async delete(@Query('email', PlayersValidationPipe) email: string): Promise<any> {
    return this.playersService.delete(email);
  }

  @Get(':_id')
  async findById(@Param('_id') _id: string): Promise<Player> {
    return this.playersService.findById(_id);
  }
}
