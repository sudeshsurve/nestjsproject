import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
    constructor(private playerservice : PlayersService){}

    @Get()
    getplayers(){
       return this.playerservice.players     
    }
    @Get('/:id')
    getSingleplayer(@Param('id')  id:string){
       return {id:id , message:"sucess"}     
    }
      



}

