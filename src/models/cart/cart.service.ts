// cart.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { CrudService } from 'src/common/crud.service';
import { User } from '../user/entities/user.entity';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CartService extends CrudService<Cart> {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {
    super(cartRepository);
  }

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const userId = createCartDto.userId;

    const existingCart = await this.cartRepository.findOneBy({id : userId});

    if (existingCart) {
      throw new ConflictException(`User with ID ${userId} already has a cart`);
    }

    const cart = new Cart();
    const user = await this.userService.findOne({id : userId});

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    cart.user = user;
    cart.products = createCartDto.products;
    cart.totalPrice = this.calculateTotalPrice(cart);

    return this.cartRepository.save(cart);
  }

  async addProductToCart(cartId: number, product: Product): Promise<Cart> {
    const cart = await this.cartRepository.findOne({where : {id : cartId}});

    if (!cart || !product) {
      throw new NotFoundException('Cart or product not found');
    }
    
    cart.products.push(product);
    cart.totalPrice = this.updateTotalPrice(cart);

    return this.cartRepository.save(cart);
  }

  async removeProductFromCart(cartId: number, product : Product): Promise<Cart> {
    const cart = await this.cartRepository.findOne({where : {id : cartId }});

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    cart.products = cart.products.filter((product) => product !== product);
    cart.totalPrice = this.updateTotalPrice(cart);

    return this.cartRepository.save(cart);
  }

  private calculateTotalPrice(cart: Cart): number {
    let totalPrice = 0;
    if (cart.products) {
      cart.products.forEach(product => {
        totalPrice += product.price;
      });
    }
    return totalPrice;
  }

  private updateTotalPrice(cart: Cart): number {
    return this.calculateTotalPrice(cart);
  }
  
}
