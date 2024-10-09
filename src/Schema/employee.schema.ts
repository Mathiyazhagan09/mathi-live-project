import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {  Schema as MongooseSchema } from 'mongoose';
@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  emailId: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  dateOfJoining: Date;

  @Prop({ required: true })
  designation: string;

  @Prop({ type:MongooseSchema.Types.Mixed}) 
  address:{
    
    country: string,
  
   
    state: string,
  
   
    city: string,
  
   
    street: string,
  
    
    pincode: string,
  };

  @Prop()
  whatsappNumber?: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);