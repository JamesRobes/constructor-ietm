import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './schema/tag.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
  ) { }

  create(createTagDto: CreateTagDto) {
    return this.tagModel.create(createTagDto);
  }

  findAll() {
    return this.tagModel.find().populate('category').exec();
  }

  findOne(id: string) {
    return this.tagModel.findById(id).populate('category').exec();
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = this.tagModel.findById(id).exec();
    if (!tag) throw new HttpException('Тэг не найден', HttpStatus.NOT_FOUND);
    const query: { $set: any } = { $set: {} };
    if (!updateTagDto.category) query.$set.category = updateTagDto.category;
    if (!updateTagDto.name) query.$set.name = updateTagDto.name;
    await this.tagModel.updateOne({ _id: id }, query);
    return await await this.tagModel.findById(id).exec();
  }

  remove(id: string) {
    this.tagModel.findByIdAndDelete(id).exec();
  }
}
