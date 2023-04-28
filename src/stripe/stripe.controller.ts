import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { Cart } from "./cart.model";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
  constructor(private readonly _svc: StripeService) {}

  @Post()
  public checkout(@Body() body: { cart: Cart }) {
    try {
      return this._svc.checkout(body.cart);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
