import { useEffect, useState } from "react";
import type { TreeNodeDto } from "../dto/TreeNodeDto";
import { getFullTree } from "../api/treeApi";
import { Card } from "@/components/ui/card";
import { TreeNode } from "@/components/TreeNode";

export default function TreeView() {
  const [tree, setTree] = useState<TreeNodeDto[]>([]);

  useEffect(() => {
    getFullTree().then((res) => setTree(res.data));
  }, []);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Tree Nodes (Flat)</h2>
      {tree.map((node) => (
        <TreeNode key={node.id} currentNode={node} />
      ))}
    </Card>
  );
}
