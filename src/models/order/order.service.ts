import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CrudService } from 'src/common/crud.service';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService extends CrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
  ) {
    super(orderRepository);
  }

  async createOrder(email: string, createOrderDto: CreateOrderDto) {
    const user = await this.userService.findByEmail(email);
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
      .where('user.email = :email', { email })
      .getMany();
  }
}
