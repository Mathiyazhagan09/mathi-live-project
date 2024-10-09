import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TaskModule } from './Task/task.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Mathi'), EmployeeModule,TaskModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


