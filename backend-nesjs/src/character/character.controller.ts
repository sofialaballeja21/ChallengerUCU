import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}



  //Carga los personajes desde la API externa
  @Get('fetch')
  async findAllFromAPi() {
    return this.characterService.fetchCharacters();
  }

  //Crea un personaje manualmente
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  //Obtiene todos los personajes desde la base de datos local
  @Get()
  findAll() {
    return this.characterService.findAll();
  }
  //Obtiene un personaje por su ID desde la base de datos local
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  //Actualiza un personaje por su ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto) {
      console.log("Recibiendo id", id)
    return this.characterService.update(+id, updateCharacterDto);
  }

  //Elimina un personaje por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
