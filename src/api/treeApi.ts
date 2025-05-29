import type { TreeNodeDto } from "../dto/TreeNodeDto";
import type { CreateNodeDto } from "../dto/CreateNodeDto";
import type { UpdateNodeDto } from "../dto/UpdateNodeDto";
import axios from "axios";

const BASE_TREE = "/api/tree";
const TREE_NODE = BASE_TREE + "/node";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5083",
});
const getTree = <T = TreeNodeDto[]>(params?: {
  parentId?: string;
  eager?: boolean;
}) => axiosInstance.get<T>(BASE_TREE, { params });

export const getRootTree = () => getTree();

export const getSubTree = (parentId?: string) =>
  getTree<TreeNodeDto>({ parentId });

export const getFullTree = () => getTree({ eager: true });

export const createNode = (data: CreateNodeDto) =>
  axiosInstance.post(TREE_NODE, data);

export const getNode = (id: string) => axiosInstance.get(`${TREE_NODE}/${id}`);

export const updateNode = (id: string, data: UpdateNodeDto) =>
  axiosInstance.put(`${TREE_NODE}/${id}`, data);

export const deleteNode = (id: string) =>
  axiosInstance.delete(`${TREE_NODE}/${id}`);
