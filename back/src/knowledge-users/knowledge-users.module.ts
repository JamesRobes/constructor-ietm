import { Module } from '@nestjs/common';
import { KnowledgeUsersService } from './knowledge-users.service';
import { KnowledgeUsersController } from './knowledge-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  KnowledgeUser,
  KnowledgeUserSchema,
} from './schema/knowledge-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KnowledgeUser.name, schema: KnowledgeUserSchema },
    ]),
  ],
  controllers: [KnowledgeUsersController],
  providers: [KnowledgeUsersService],
})
export class KnowledgeUsersModule {}
