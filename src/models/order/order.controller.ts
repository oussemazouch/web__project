import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEmail } from 'src/common/docrators/user.decorator';
import { JwtAuthGuard } from '../user/Guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto,@UserEmail() email:string) {
    return this.orderService.createOrder(email,createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findAllByUser(@UserEmail() email:string) {
    return this.orderService.findOrdersByUser(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
