import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { ProductDoc } from "./product.schema";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly _svc: ProductService) {}

  @Post()
  public async createProduct(
    @Body() product: CreateProductDto,
    @Res() res
  ): Promise<ProductDoc> {
    const result = await this._svc.createProduct(product);

    return res.status(HttpStatus.CREATED).json({
      status: "OK",
      message: "Record Created Successfully",
      data: result,
    });
  }

  @Get()
  public async getAllProducts(
    @Res() res
  ): Promise<ProductDoc> {
    const result = await this._svc.getAllProducts();

    return res.status(HttpStatus.CREATED).json({
      status: "OK",
      message: "Record Created Successfully",
      data: result,
    });
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  public async getProductById(
    @Param("id") id: string,
    @Res() res
  ): Promise<ProductDoc> {
    const result = await this._svc.getProductById(id);

    return res.status(HttpStatus.OK).json({
      status: "OK",
      message: "Record Get Successfully",
      data: result,
    });
  }

  @Delete(":id")
  public async deleteProductById(
    @Param("id") id: string,
    @Res() res
  ): Promise<ProductDoc> {
    const result = await this._svc.deleteProductById(id);

    return res.status(HttpStatus.OK).json({
      status: "OK",
      message: "Record Deleted Successfully",
      data: null,
    });
  }

  @Patch(":id")
  public async updateProductById(
    @Param("id") id: string,
    @Body() product: UpdateProductDto,
    @Res() res
  ): Promise<ProductDoc> {
    const result = await this._svc.updateProductById(id, product);

    return res.status(HttpStatus.OK).json({
      status: "OK",
      message: "Record Updated Successfully",
      data: result,
    });
  }
}
