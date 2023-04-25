import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterUserDto } from "src/user/user.dto";
import { UserDetails } from "src/user/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private _usersvc: UserService) {}

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // readonly make sure all the the properties are required to create user
  public async register(
    user: Readonly<RegisterUserDto>
  ): Promise<UserDetails | null> {
    const { name, email, password } = user;

    const existingUser = await this._usersvc.findByEmail(email);
    if (existingUser) {
      throw new HttpException("user already exist", HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this._usersvc.create(name, email, hashedPassword);

    return this._usersvc._getUserDetails(newUser);
  }
}
