import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDetails } from "./user.interface";
import { UserDoc } from "./user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly model: Model<UserDoc>) {}

  _getUserDetails(user: UserDoc): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  public async findByEmail(email: string): Promise<UserDoc> {
    return this.model.findOne({ email }).exec();
  }

  public async findById(id: string): Promise<UserDetails | null> {
    const user = await this.model.findById(id).exec();

    if (!user) return null;

    return this._getUserDetails(user);
  }

  public async create(
    name: string,
    email: string,
    hashPassword: string
  ): Promise<UserDoc> {
    return this.model.create({
      name,
      email,
      password: hashPassword,
    });
  }
}
