import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { UserDetails } from "./user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly _svc: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res): Promise<UserDetails | null> {
    const result = await this._svc.findById(id)

    return res.status(HttpStatus.OK).json({
      status: "OK",
      message: "Record Get Successfully",
      data: result,
    });
  }
}
