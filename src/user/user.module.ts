import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
