import { Body, Controller, Post } from "@nestjs/common";
import { ProductDoc } from "./product.schema";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
  constructor(private readonly _svc: ProductService) {}

  @Post()
  public async createProduct(
    @Body("name") name: string,
    @Body("price") price: string,
    @Body("desc") desc?: string
  ): Promise<ProductDoc> {
    return this._svc.createProduct(name, price, desc)
  }
}
