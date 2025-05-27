import type { TreeNodeDto } from '../dto/TreeNodeDto';
import type { CreateNodeDto } from '../dto/CreateNodeDto';
import type { UpdateNodeDto } from '../dto/UpdateNodeDto';
import axios from 'axios';

const BASE_TREE = '/api/tree';
const TREE_NODE = BASE_TREE + "/node";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44309",
})

export const getTree = () => axiosInstance.get<TreeNodeDto[]>(BASE_TREE);
export const getSubTree = (parentId?: string) => axiosInstance.get<TreeNodeDto>(BASE_TREE, { params: { parentId } });
export const createNode = (data: CreateNodeDto) => axiosInstance.post(TREE_NODE, data);
export const getNode = (id: string) => axiosInstance.get(`${TREE_NODE}/${id}`);
export const updateNode = (id: string, data: UpdateNodeDto) => axiosInstance.put(`${TREE_NODE}/${id}`, data);
export const deleteNode = (id: string) => axiosInstance.delete(`${TREE_NODE}/${id}`);
