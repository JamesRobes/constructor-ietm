import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map } from 'rxjs';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './schema/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { title, data, userId, categoryId } = createArticleDto;
    const newArticle = await this.articleModel.create({
      title,
      user: userId,
      moderation: false,
      data,
      likes: [],
      category: categoryId,
    });
    return newArticle;
  }

  findAll(
    query: {
      moderation?: boolean;
      userId?: string;
      categoryId?: string;
    } = {},
  ) {
    return this.articleModel.find(query).exec();
  }

  findOne(id: string) {
    const article = this.articleModel.findById(id).exec();
    if (!article)
      throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND);
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleModel.findById(id).exec();
    if (!article)
      throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND);
    let query = { $set: updateArticleDto };
    await this.articleModel.updateOne({ _id: id }, query).exec();
    const newArticle = await this.articleModel.findById(id).exec();
    return newArticle;
  }

  remove(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
