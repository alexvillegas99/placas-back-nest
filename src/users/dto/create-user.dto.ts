import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers/enumToString';

export class CreateUserDto {

  @ApiPropertyOptional({ example: 'Juan Tipti', description: 'Nombre de usuario' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'user123', description: 'Username del usuario' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional({ example: '12345678', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;

  @ApiPropertyOptional({ example: '12345678', description: 'Contraseña del usuario' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({type:  [], description: 'Roles del usuario',enum:AppRoles })
  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value, ${EnumToString(AppRoles)}`,
  })
  roles: string[];
}
