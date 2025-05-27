import { useEffect, useState } from "react";
import type { TreeNodeDto } from "../dto/TreeNodeDto";
import { getSubTree, getTree } from "../api/treeApi";
import { Card } from "@/components/ui/card";
import { TreeNode } from "@/components/TreeNode";


export default function TreeView() {
  const [roots, setRoots] = useState<TreeNodeDto[]>([]);

  useEffect(() => {
    getTree().then(res => setRoots(res.data));
  }, []);

  const loadChildren = async (parentId: string): Promise<TreeNodeDto | null> => {
    const res = await getSubTree(parentId);
    return res.data;
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Tree Nodes</h2>
      {roots.map(root => (
        <TreeNode key={root.id} node={root} loadChildren={loadChildren} />
      ))}
    </Card>
  );
}
