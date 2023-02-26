import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory;
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category)
      throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND);
    const query = { $set: {} };
    for (const key in updateCategoryDto) {
      if (
        category[key] !== undefined &&
        category[key] !== updateCategoryDto[key]
      )
        query.$set[key] = updateCategoryDto[key];
    }
    await this.categoryModel.updateOne({ id }, query).exec();
    return await this.categoryModel.findById(id).exec();
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
