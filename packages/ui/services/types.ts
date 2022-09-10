export type ListItemType = {
  _id: string;
  created: Date;
  lastModified: Date;
  deleted: boolean;
  name: string;
  description?: string;
  quantity: number;
  purchased: boolean;
};

export type AddListItemParameters = {
  name: string;
  description?: string;
  quantity: number;
};

export type EditListItemParameters = {
  _id: string;
  name?: string;
  description?: string;
  quantity?: number;
  purchased?: boolean;
};

export type DeleteListItemParameters = {
  _id: string;
};
