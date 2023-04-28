import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

import { Cart } from "./cart.model";

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
  }

  public checkout(cart: Cart) {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    return this.stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "USD",
      payment_method_types: ['card'],

    })
  }
}
