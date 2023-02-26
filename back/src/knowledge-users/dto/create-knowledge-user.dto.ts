export class CreateKnowledgeUserDto {
  userId: string;
  mainAdmin: boolean;
  categoriesAdmin?: string[];
}
