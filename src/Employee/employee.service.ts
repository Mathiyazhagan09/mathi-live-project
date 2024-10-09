import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../schema/employee.schema';
import { CreateEmployeeDto } from './dto/employee.dto'; 
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  async createEmployee(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const existingEmployee = await this.employeeModel.findOne({ emailId: employeeDto.emailId }).exec();
    if (existingEmployee) {
      throw new ConflictException(`Employee with emailId ${employeeDto.emailId} already exists`);
    }

    const newEmployee = new this.employeeModel(employeeDto);
    return newEmployee.save();
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async getEmployeeById(employeeId: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(employeeId).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return employee;
  }


async deleteEmployee(employeeId: string): Promise<{ success: boolean; message: string }> {
    const employee = await this.employeeModel.findByIdAndDelete(employeeId).exec();

    if (!employee) {
      return { success: false, message: `Employee with ID ${employeeId} not found` };
    }
    return { success: true, message: `Employee with ID ${employeeId} has been successfully deleted` };
  }
}
