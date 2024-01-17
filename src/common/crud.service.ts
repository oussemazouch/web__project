import { Injectable, NotFoundException } from '@nestjs/common';
import { HasIdInterface } from './hasId.interface';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CrudService<T extends HasIdInterface> {
  constructor(private repository: Repository<T>) {}
  create(entity: DeepPartial<T>) {
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id, updateEntityDto: DeepPartial<T>) {
    const existingEntity = await this.repository.findOne({ where: { id } });

    if (!existingEntity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    const updatedEntity = Object.assign(existingEntity, updateEntityDto);

    return this.repository.save(updatedEntity);
  }

  async remove(id) {
    const existingEntity = await this.repository.findOne({ where: { id } });

    if (!existingEntity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return this.repository.remove(existingEntity);
  }
}
