import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDoc = User & Document

@Schema()
export class User {

}

export const UserSchema = SchemaFactory.createForClass(User)
