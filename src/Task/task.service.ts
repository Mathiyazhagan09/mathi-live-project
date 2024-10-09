import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { Employee } from 'src/schema/employee.schema';
import { CreateTaskDto } from './dto/createtask.dto';

@Injectable()
export class TaskService {
   constructor (@InjectModel(Task.name) private taskModel: Model<Task>,
   @InjectModel(Employee.name) private employeeModel: Model<Employee>,
 ) {}

 async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  const task = new this.taskModel(createTaskDto);
  return task.save();
}

async getTaskById(taskId: string): Promise<{ tasks: Task[], totalTasks: number }> {
  const tasks = await this.taskModel.find({ assign: taskId }).populate('assign', 'name emailId designation').exec();
  const totalTasks = tasks.length; 
  return {tasks, totalTasks};
 
}


async getAllTasks(): Promise<Task[]> {
  return this.taskModel.find().populate('assign', 'name emailId designation').exec();
}

  async update(id: string, updateTaskDto: any): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }


  async updateRevisionDate(id: string, revisionDate: Date): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { revisionDate }, { new: true }).exec();
  }


  async findByEmployeeId(employeeId: string): Promise<Task[]> {
    return this.taskModel.find({ assign: employeeId }).exec();
  }

async delete(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      return false; 
    }
    return true; 
  }


}
