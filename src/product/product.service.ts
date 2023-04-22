import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { ProductDoc } from "./product.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private readonly model: Model<ProductDoc>
  ) {}

  public async createProduct(product: CreateProductDto): Promise<ProductDoc> {
    const alreadyExist = await this.model.findOne({name: product.name})

    if(alreadyExist) {
      throw new HttpException("product already exists", HttpStatus.BAD_REQUEST);
    }

    const newProduct = await this.model.create(product);
    if (!newProduct) {
      throw new HttpException("product not created", HttpStatus.BAD_REQUEST);
    }
    return newProduct;
  }

  public async getAllProducts(): Promise<ProductDoc[]> {
   

    const products = await this.model.find().exec();
    if (!products.length) {
      throw new HttpException("products not found", HttpStatus.NOT_FOUND);
    }
    return products;
  }

  public async getProductById(id: string): Promise<ProductDoc> {
    if (!id) {
      throw new HttpException(
        "id is missing in params",
        HttpStatus.BAD_REQUEST
      );
    }
    const product = await this.model.findById(id);
    if (!product) {
      throw new HttpException("product not get", HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  public async deleteProductById(id: string): Promise<ProductDoc> {
    if (!id) {
      throw new HttpException(
        "id is missing in params",
        HttpStatus.BAD_REQUEST
      );
    }
    const product = await this.model.findByIdAndDelete(id);
    if (!product) {
      throw new HttpException("product not deleted", HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  public async updateProductById(
    id: string,
    data: UpdateProductDto
  ): Promise<ProductDoc> {
    if (!id) {
      throw new HttpException(
        "id is missing in params",
        HttpStatus.BAD_REQUEST
      );
    }
    const product = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      throw new HttpException("product not updated", HttpStatus.BAD_REQUEST);
    }
    return product;
  }
}
