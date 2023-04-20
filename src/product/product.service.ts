import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductDoc } from "./product.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private readonly model: Model<ProductDoc>
  ) {}
  public async createProduct(
    name: string,
    price: string,
    desc: string
  ): Promise<ProductDoc> {
    const product = await this.model.create({ name, price, desc });
    if (!product) {
      throw new HttpException("product not created", HttpStatus.BAD_REQUEST);
    }
    return product;
  }
}
