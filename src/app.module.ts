import { Module } from '@nestjs/common';
import { PlayersModule } from './controllers/players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [PlayersModule , MongooseModule.forRoot('mongodb://127.0.0.1/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {

}
