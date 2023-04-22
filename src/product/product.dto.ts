export class CreateProductDto {
    name: string;
    price: number;
    desc?: string
}

export class UpdateProductDto {
    name?: string;
    price?: number;
    desc?: string
}