import { Injectable, NotFoundException} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CrudService } from 'src/common/crud.service';

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {
    super(productRepository);
  }
  
}
