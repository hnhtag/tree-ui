import { useEffect, useState } from "react";
import type { TreeNodeDto } from "../dto/TreeNodeDto";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronRight,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";
import { createNode, deleteNode, updateNode } from "@/api/treeApi";
import { Input } from "./ui/input";

interface TreeNodeProps {
  currentNode: TreeNodeDto;
  parentId?: string;
  isExpanded?: boolean;
  loadChildren?: (id: string) => Promise<TreeNodeDto | null>;
}

export const TreeNode = ({
  currentNode,
  loadChildren,
  parentId,
  isExpanded = false,
}: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<TreeNodeDto[]>([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [inputValue, setInputValue] = useState(currentNode.name);
  const [hovering, setHovering] = useState(false);

  const handleExpand = async () => {
    if (!expanded && currentNode.hasChildren) {
      if (currentNode.children?.length === 0 && loadChildren) {
        const subTree = await loadChildren(currentNode.id);
        if (subTree) setChildren(subTree.children);
      } else {
        setChildren(currentNode.children);
      }
    }
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    await deleteNode(currentNode.id);
    window.location.reload(); // or notify parent to re-fetch
  };

  const handleEditSave = async () => {
    await updateNode(currentNode.id, {
      id: currentNode.id,
      name: inputValue,
      parentId: parentId ?? null,
    });
    currentNode.name = inputValue; // mutate or use state lifting

    setEditing(false);
  };

  const handleAddChild = async () => {
    if (!inputValue.trim()) return;

    const res = await createNode({
      name: inputValue,
      parentId: currentNode.id,
    });

    const newChild: TreeNodeDto = {
      id: res.data.id,
      name: res.data.name,
      hasChildren: false,
      children: [],
    };

    setChildren((prev) => [...prev, newChild]);
    setExpanded(true);
    setAdding(false);
    setInputValue("");
  };

  useEffect(() => {
    if (isExpanded && currentNode.children?.length > 0) {
      setChildren(currentNode.children);
      if (
        !expanded &&
        currentNode.hasChildren &&
        currentNode.children.length > 0
      ) {
        setExpanded(true);
      }
    }
  }, [currentNode, isExpanded]);

  return (
    <div
      className={`ml-1 mt-2 ${
        parentId && "border-l-1 border-gray-300 border-dashed"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          !currentNode.hasChildren && "pl-10"
        }`}
      >
        {currentNode.hasChildren && (
          <Button size="icon" variant="ghost" onClick={handleExpand}>
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </Button>
        )}

        {editing ? (
          <>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-48 text-black"
            />
            <Button size="sm" variant="outline" onClick={handleEditSave}>
              Save
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditing(false)}
            >
              <X size={16} />
            </Button>
          </>
        ) : (
          <div
            className="flex gap-3"
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="text-black h-9 flex items-center">
              <span>{currentNode.name}</span>
            </div>

            {hovering && (
              <div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                >
                  <Pencil size={8} />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleDelete}>
                  <Trash size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setAdding(true)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {expanded && children.length > 0 && (
        <div className="ml-4">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              currentNode={child}
              parentId={currentNode.id}
              loadChildren={loadChildren}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      )}

      {adding && (
        <div className="ml-6 flex items-center gap-2 mt-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New child node name"
            className="w-48 text-black"
          />
          <Button size="sm" variant="outline" onClick={handleAddChild}>
            Add
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setAdding(false)}>
            <X size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};
