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
} from 'class-validator';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';

export class CreatePlateDto {
  @ApiProperty({
    example: 'TBA123',
    description: 'Placa del vehículo',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  plate: string;

  @ApiProperty({
    example: 'Publico',
    description: 'Tipo de placa',
    enum:PlateType
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PlateType)
  plate_type: string;

  @ApiProperty({
    example: 'Moto',
    description: 'Tipo de vehículo',
    enum:VehicleType
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(VehicleType)
  vehicle_type: string;

  @IsOptional()
  user?: any;
  @IsOptional()
  status:boolean;
}
