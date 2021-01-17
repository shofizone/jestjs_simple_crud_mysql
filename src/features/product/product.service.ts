import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './products.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
  ) {}

  async insertProduct(data: Product): Promise<Product> {
    try {
      const newProduct = this.userRepository.create(data);
      const doc = await Product.save(newProduct);
      Logger.log(doc);
      return doc;
    } catch (e) {
      throw new BadRequestException('Unable to create document');
    }
  }

  async getAllProducts() {
    try {
      const docs = await this.userRepository.find();
      console.log(docs);
      return docs;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Unable to get document');
    }
  }

  async getProduct(id: string) {
    try {
      const doc = await this.userRepository.findOne(id);
      if (!doc) {
        throw new NotFoundException();
      }
      // console.log(docs);
      return doc;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateAProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    try {
      await this.userRepository.update(id, {
        title,
        description,
        price,
      });
      // console.log(docs);
      return await this.userRepository.findOne(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteAProduct(id: string) {
    try {
      const doc = await this.userRepository.delete(id);
      // console.log(docs);
      return doc;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Unable to get document');
    }
  }
}
