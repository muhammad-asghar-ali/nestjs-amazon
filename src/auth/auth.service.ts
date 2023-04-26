import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserDto, RegisterUserDto } from "src/user/user.dto";
import { UserDetails } from "src/user/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private _usersvc: UserService, private _jwtSvc: JwtService) {}

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  public async doesPasswordMatch(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public async validateUser(
    email: string,
    password: string
  ): Promise<UserDetails | null> {
    const user = await this._usersvc.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) {
      throw new HttpException(
        "invaild user credentials",
        HttpStatus.BAD_REQUEST
      );
    }

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password
    );

    if (!doesPasswordMatch) {
      throw new HttpException(
        "invaild user credentials",
        HttpStatus.BAD_REQUEST
      );
    }
    return this._usersvc._getUserDetails(user);
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

  // readonly make sure all the the properties are required to create user
  public async login(
    user: Readonly<LoginUserDto>
  ): Promise<{ token: string } | null> {
    const { email, password } = user;

    const existingUser = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }

    const jwt = await this._jwtSvc.signAsync({ user });

    return { token: jwt };
  }
}
