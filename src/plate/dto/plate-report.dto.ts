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
  IsDateString,
} from 'class-validator';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';

export class PlateReportDto {


  @ApiPropertyOptional({
    example: true,
    description: 'Estado de la placa',
  })
  @IsBoolean()
  @IsOptional()
  status: boolean;



  @ApiPropertyOptional({
    example: 'Publico',
    description: 'Tipo de placa',
    enum:PlateType
  })
  @IsString()
  @IsEnum(PlateType)
  @IsOptional()
  plate_type: string;



  @ApiPropertyOptional({
    example: 'Moto',
    description: 'Tipo de vehículo',
    enum:VehicleType
  })
  @IsDateString()
  @IsEnum(VehicleType)
  @IsOptional()
  vehicle_type: string;



  @ApiPropertyOptional({
    example: 'Moto',
    description: 'Tipo de vehículo',
  })
  @IsDateString()
  @IsOptional()
  date_start: string;



  @ApiPropertyOptional({
    example: 'Moto',
    description: 'Tipo de vehículo',
    enum:VehicleType
  })
  @IsDateString()
  @IsOptional()
  date_end?: any;

}
