import { useState } from "react";
import type { TreeNodeDto } from "../dto/TreeNodeDto";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight, Pencil, Plus, Trash } from "lucide-react";

interface TreeNodeProps {
  node: TreeNodeDto;
  loadChildren: (id: string) => Promise<TreeNodeDto | null>;
}

export const TreeNode = ({ node, loadChildren }: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<TreeNodeDto[]>([]);

  const handleExpand = async () => {
    if (!expanded && node.hasChildren && children.length === 0) {
      const subTree = await loadChildren(node.id);
      if (subTree) setChildren(subTree.children);
    }
    setExpanded(!expanded);
  };

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2">
        {node.hasChildren && (
          <Button size="icon" variant="ghost" onClick={handleExpand}>
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </Button>
        )}
        <span className="text-black">{node.name}</span>
        <Button size="icon" variant="ghost"><Pencil size={16} /></Button>
        <Button size="icon" variant="ghost"><Trash size={16} /></Button>
        <Button size="icon" variant="ghost"><Plus size={16} /></Button>
      </div>
      {expanded && children.length > 0 && (
        <div className="ml-4">
          {children.map(child => (
            <TreeNode key={child.id} node={child} loadChildren={loadChildren} />
          ))}
        </div>
      )}
    </div>
  );
};