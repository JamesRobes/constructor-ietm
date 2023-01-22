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
    const newArticle = await this.articleModel.create(createArticleDto);
    return newArticle;
  }

  findAll(moderation?: boolean, userId?: string) {
    if (moderation !== undefined)
      return this.articleModel.find({ moderation }).exec();
    if (userId !== undefined) return this.articleModel.find({ userId }).exec();
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
    let query = { $set: {} };
    for (const key in updateArticleDto) {
      if (article[key] !== undefined && article[key] !== updateArticleDto[key])
        query.$set[key] = updateArticleDto[key];
    }
    await this.articleModel.updateOne({ _id: id }, query).exec();
    const newArticle = await this.articleModel.findById(id).exec();
    return newArticle;
  }

  remove(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
