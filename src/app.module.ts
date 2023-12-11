import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, PlayersModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
