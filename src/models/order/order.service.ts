import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CrudService } from 'src/common/crud.service';
import { UserService } from '../user/user.service';
import { Product } from '@ngneat/falso';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService extends CrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService:ProductService,
  ) {
    super(orderRepository);
  }

  async createOrder(email: string, createOrderDto: CreateOrderDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException();
    if(createOrderDto.products.length>0)
    {
      
      
        const prods= await this.productService.findByIds(createOrderDto.products);
        const newOrder = new Order();
         newOrder.user=user;
         newOrder.products=prods;
         newOrder.isPaid=createOrderDto.isPaid;
         newOrder.totalAmount=createOrderDto.totalAmount;
        this.create(newOrder);
      
    }
    
  }
  async createOrderByAdmin( createOrderDto: CreateOrderDto) {
    const user = await this.userService.findByEmail('oussama.zouch@insat.ucar.tn');
    console.log(user);
    if (!user) throw new NotFoundException();
    else {
      const order = { user, ...createOrderDto };
      this.create(order);
    }
  }

  async findOrdersByUser(email: string) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.products', 'products') 
      .where('user.email = :email', { email })
      .getMany();
  }
}
