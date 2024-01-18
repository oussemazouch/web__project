import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '../product/entities/product.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Get(':cartId')
  async getCart(@Param('cartId') cartId: number) {
    return this.cartService.findOne(cartId);
  }
  
  @Post()
   createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Post(':cartId')
  async addProductToCart(
    @Param('cartId') cartId: number,
    @Body() product: Product,
  ) {
    return this.cartService.addProductToCart(cartId, product);
  }

  @Delete(':cartId')
  async removeProductFromCart(
    @Param('cartId') cartId: number,
    @Body() product: Product,
  ) {
    return this.cartService.removeProductFromCart(cartId, product);
  }

  
}
