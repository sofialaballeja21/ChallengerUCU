import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Character } from './entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  async fetchCharacters() {
    const apiUrl = process.env.API_URL || 'https://rickandmortyapi.com/api/character';
    const response = await firstValueFrom(this.httpService.get(apiUrl));
    const characters = response.data.results;

    for (const char of characters) {
      const existingCharacter = await this.characterRepo.findOneBy({ id: char.id });
      if (!existingCharacter) {

        const character = this.characterRepo.create({
          id: char.id,
          name: char.name,
          status: char.status,
          species: char.species,
          type: char.type,
          gender: char.gender,
          originname: char.origin?.name,
          originURL: char.origin?.url,
          locationname: char.location?.name,
          locationURL: char.location?.url,
          image: char.image,
          episode: char.episode,
        });
        await this.characterRepo.save(character);
    }
    }

    return { message: `${characters.length} characters saved successfully` };
  }

  async create(DTO: CreateCharacterDto): Promise<Character> {
    const character = this.characterRepo.create(DTO);
    return await this.characterRepo.save(character);
  }

  async findAll(): Promise<Character[]> {
    return await this.characterRepo.find();
  }

  async findOne(id: number): Promise<Character | null> {
    return await this.characterRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCharacterDto): Promise<Character> {
  const existingCharacter = await this.characterRepo.findOneBy({ id });
  if (!existingCharacter) throw new Error(`Character with ID ${id} not found.`);

  const updatedCharacter = this.characterRepo.merge(existingCharacter, {
    name: dto.name ?? existingCharacter.name,
    status: dto.status ?? existingCharacter.status,
    species: dto.species ?? existingCharacter.species,
    type: dto.type ?? existingCharacter.type,
    gender: dto.gender ?? existingCharacter.gender,
    originname: dto.originname ??  existingCharacter.originname,
    originURL: dto.originURL ??  existingCharacter.originURL,
    locationname: dto.locationname ?? existingCharacter.locationname,
    locationURL: dto.locationURL ?? existingCharacter.locationURL,
    image: dto.image ?? existingCharacter.image,
    episode: dto.episode ?? existingCharacter.episode,
  });

  return await this.characterRepo.save(updatedCharacter);
}

  async remove(id: number): Promise<{ message: string }> {
    const character = await this.characterRepo.findOneBy({ id });
    if (!character) throw new Error(`Character with ID ${id} not found.`);
    await this.characterRepo.remove(character);
    return { message: `Character with ID ${id} deleted.` };
  }

}