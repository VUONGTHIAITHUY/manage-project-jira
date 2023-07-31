
export class Project {
  id: number | undefined;
  projectName: string | undefined;
  description: string | undefined;
  alias: string | undefined;
  categoryName: string | undefined;
  categoryId: number | undefined;
  creator: Creator = new Creator();
  members: Object[] = []
}

export class Category {
  id: number | undefined;
  projectCategoryName: string | undefined;
}

export class Creator {
  id: number | undefined;
  name: string | undefined;
}

export class Member {
  id: number | undefined;
  name: string | undefined;
}
