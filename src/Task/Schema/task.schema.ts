import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from 'src/schema/employee.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true, enum: ['pending', 'in-progress', 'completed'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: Employee.name, required: true })
  assign: string;

  @Prop()
  estimateDate: Date;

  @Prop()
  revisionDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
