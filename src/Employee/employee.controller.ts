import { Controller, Get, Post, Param, Body, Delete,Res,HttpStatus} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/employee.dto'; 
import { Response } from 'express';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(employeeDto);
  }

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') employeeId: string) {
    return this.employeeService.getEmployeeById(employeeId);
  }



@Delete(':id')
  async deleteEmployee(@Param('id') employeeId: string, @Res() res: Response) {
    const result = await this.employeeService.deleteEmployee(employeeId);

    if (result.success) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: result.message,
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: result.message,
      });
    }
  }
}
