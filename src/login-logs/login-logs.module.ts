import { Module } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';

@Module({
  controllers: [],
  providers: [LoginLogsService]
})
export class LoginLogsModule {}
