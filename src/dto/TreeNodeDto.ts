export interface TreeNodeDto {
  id: string;
  name: string;
  hasChildren: boolean;
  children: TreeNodeDto[];
}