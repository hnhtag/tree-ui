import type { CreateNodeDto } from "./CreateNodeDto";

export interface UpdateNodeDto extends CreateNodeDto {
  id: string
}