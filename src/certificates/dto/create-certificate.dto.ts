import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';

export class CreateCertificateDto {
  @ApiPropertyOptional({ type: [], example: [] })
  @IsArray()
  plates: string[];
  @ApiProperty({
    example: 1,
    description: 'Numero de acta',
  })
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({
    example: 'Esta placa se entrega en condiciones....',
    description: 'Observación',
  })
  @IsNotEmpty()
  @IsString()
  observation: string;

  @ApiProperty({
    example: '293273612',
    description: 'Cédula de identidad de la persona que retira',
  })
  @IsNotEmpty()
  @IsString()
  identification: string;

  @ApiProperty({
    example: 'Juan Carlos',
    description: 'Nombre de la persona que retira la placa',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  user?: any;
}
