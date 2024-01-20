import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Page } from 'src/common/dtos/page.dto';
import { Pagination } from 'nestjs-typeorm-paginate';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async getProductsByPage(@Body() pageData: Page): Promise<Pagination<Product>>
  {
    return this.productService.paginate({
      page:pageData.page,
      limit:pageData.limit,

    });
  }


  //#region CRUD methods
  @Get()
  findAll():Promise<Product[]> {
    return this.productService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }


  @Post()
  async create(@Body() createProductDto: CreateProductDto):Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }
  


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productService.remove(id);
    return;
  }
  

  
}

