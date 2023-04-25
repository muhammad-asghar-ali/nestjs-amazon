import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { RegisterUserDto } from "src/user/user.dto";
import { UserDetails } from "src/user/user.interface";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly _svc: AuthService) {}

  @Post("register")
  public async register(
    @Body() user: RegisterUserDto,
    @Res() res
  ): Promise<UserDetails | null> {
    const result = await this._svc.register(user);

    return res.status(HttpStatus.OK).json({
      status: "OK",
      message: "Record Updated Successfully",
      data: result,
    });
  }
}
