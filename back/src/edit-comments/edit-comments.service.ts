import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEditCommentDto } from './dto/create-edit-comment.dto';
import { UpdateEditCommentDto } from './dto/update-edit-comment.dto';
import { EditComment, EditCommentDocument } from './schema/edit-comment.schema';

@Injectable()
export class EditCommentsService {
  constructor(
    @InjectModel(EditComment.name)
    private editCommentModel: Model<EditCommentDocument>,
  ) { }

  create(createEditCommentDto: CreateEditCommentDto) {
    const { articleId, authorId, text } = createEditCommentDto;
    return this.editCommentModel.create({
      article: articleId,
      author: authorId,
      text,
    });
  }

  findAll() {
    return this.editCommentModel
      .find()
      .populate('article author')
      .select('-__v -article.__v -author.__v')
      .exec();
  }

  findOne(id: string) {
    return this.editCommentModel
      .findById(id)
      .find()
      .populate('article author')
      .select('-__v -article.__v -author.__v')
      .exec();
  }

  async update(id: string, updateEditCommentDto: UpdateEditCommentDto) {
    const comment = await this.editCommentModel.findById(id).exec();
    if (!comment)
      throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
    const query: { $set: any } = { $set: {} };
    if (
      !updateEditCommentDto.text &&
      updateEditCommentDto.text !== comment.text
    )
      query.$set.text = updateEditCommentDto.text;
    await this.editCommentModel.updateOne({ _id: id }, query);
    return await await this.editCommentModel.findById(id).exec();
  }

  remove(id: string) {
    return this.editCommentModel.findByIdAndDelete(id).exec();
  }
}
