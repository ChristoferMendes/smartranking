import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { category } = createCategoryDto;

    const categoryFound = await this.categoryModel.findOne({ category });

    if (categoryFound)
      throw new BadRequestException(`Category ${category} already exists`);

    const categoryCreated = new this.categoryModel(createCategoryDto);

    return categoryCreated.save();
  }
}
