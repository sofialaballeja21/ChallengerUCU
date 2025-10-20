import { IsOptional, IsString } from "class-validator"

export class CreateCharacterDto {
    
        @IsString()
        name: string;
    
        @IsString()
        status: string;
    
        @IsString()
        species: string;
    
        @IsString()
        type: string;
    
        @IsString()
        gender: string;
    
        @IsString()
        originname: string;
    
        @IsString()
        @IsOptional()
        originURL: string;
        
    
        @IsString()
        locationname: string;
    
        @IsString()
        @IsOptional()
        locationURL: string;
    
        @IsString()
        @IsOptional()
        image: string;
    
        @IsString()
        episode: string[];
    
}
