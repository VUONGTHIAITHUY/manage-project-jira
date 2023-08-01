
export class Project {
  id: number | undefined;
  projectName: string = '';
  description: string | undefined = '<p>bay cho.</p>';
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

export class ProjectDetailModel {
  id: number | undefined;
  projectName: string | undefined;
  description: string | undefined = '<p>bay cho.</p>';
  alias: string | undefined;
  projectCategory: any;
  creator: Creator = new Creator();
  members: MemberModel[] = [];
  lstTask: any[] = []
}

export class MemberModel {
  id: number | undefined;
  name: string | undefined;
}
