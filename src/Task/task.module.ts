import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './schema/task.schema';
import { Employee, EmployeeSchema } from 'src/schema/employee.schema';


@Module({
  imports: [ MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema, },{ name: Employee.name, schema: EmployeeSchema }]),],
  controllers: [TaskController],    
  providers: [TaskService],       
  exports: [TaskService],           
})
export class TaskModule {}
