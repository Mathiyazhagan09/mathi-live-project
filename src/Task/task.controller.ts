import { Controller, Get, Post, Body, Param, Delete, Put,HttpException,HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/createtask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

 @Get(':id')
  async getTaskById(@Param('id') taskId: string): Promise<{ tasks: Task[], totalTasks: number }> {
    return this.taskService.getTaskById(taskId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.taskService.update(id, updateTaskDto);
  }

 
  @Put(':id/revision')
  updateRevisionDate(@Param('id') id: string, @Body('revisionDate') revisionDate: Date) {
    return this.taskService.updateRevisionDate(id, revisionDate);
  }


  @Get('employee/:assign')
  findByEmployeeId(@Param('assign') employeeId: string) {
    return this.taskService.findByEmployeeId(employeeId);
  }

@Delete(':id')
async delete(@Param('id') id: string): Promise<{ success: boolean }> {
  const success = await this.taskService.delete(id);
  if (!success) {
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }
  return { success: true }; 
}
  }


