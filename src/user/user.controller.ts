import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly _svc: UserService) {}
}
