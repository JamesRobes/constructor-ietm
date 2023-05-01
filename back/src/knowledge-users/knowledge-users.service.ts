import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateKnowledgeUserDto } from './dto/create-knowledge-user.dto';
import { UpdateKnowledgeUserDto } from './dto/update-knowledge-user.dto';
import {
  KnowledgeUser,
  KnowledgeUserDocument,
} from './schema/knowledge-user.schema';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class KnowledgeUsersService {
  constructor(
    @InjectModel(KnowledgeUser.name)
    private knowledgeUserModel: Model<KnowledgeUserDocument>,
    private userService: UserService
  ) { }

  async create(createKnowledgeUserDto: CreateKnowledgeUserDto) {
    const { email } = createKnowledgeUserDto;
    const user = await this.userService.findByEmail(email)
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    const newUser = await this.knowledgeUserModel.create({
      user: user,
      mainAdmin: false,
      categoriesAdmin: [],
    });
    return newUser;
  }

  findAll() {
    return this.knowledgeUserModel
      .find()
      .populate('categoriesAdmin user')
      .select('-__v -categoriesAdmin.__v')
      .exec();
  }

  findOne(userId: string) {
    return this.knowledgeUserModel
      .findOne({ user: userId })
      .populate('categoriesAdmin user')
      .select('-__v -categoriesAdmin.__v')
      .exec();
  }

  async update(id: string, updateKnowledgeUserDto: UpdateKnowledgeUserDto) {
    const user = await this.knowledgeUserModel.findById(id).exec();
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    const query: { $set: any } = { $set: {} };
    if (updateKnowledgeUserDto.categoriesAdmin !== undefined)
      query.$set.categoriesAdmin = updateKnowledgeUserDto.categoriesAdmin;
    await this.knowledgeUserModel.updateOne({ _id: id }, query).exec();
    return await this.knowledgeUserModel.findById(id);
  }

  remove(id: string) {
    return this.knowledgeUserModel.findByIdAndDelete(id).exec();
  }
}
