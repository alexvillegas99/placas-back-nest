import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PayloadActions } from 'src/common/helpers/emuns/payload-actions.emun';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';

export class CertificateLogsDto {
  @ApiProperty({
    example: 'TBA123',
    description: 'Placa del vehículo',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  plate: string;
  
    
  @IsNotEmpty()
  @IsString()
  identification?: string;
    
  @IsNotEmpty()
  @IsString()
  detail?: string;

  @IsNotEmpty()
  @IsString()
  observation?: string;

  @IsNotEmpty()
  @IsString()
  user?: any;

  @ApiProperty({
    example: 'Created',
    description: 'Registro creado',
    enum: PayloadActions,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PayloadActions)
  payload: string;

}
