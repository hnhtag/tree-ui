import "./App.css";
import TreeView from "./pages/TreeView";
import TreeViewLazy from "./pages/TreeViewLazy";

function App() {
  return (
    <div className="min-h-screen w-full p-6 bg-gray-50">
      <div className="grid grid-cols-2 gap-4">
        <TreeView />
        <TreeViewLazy />
      </div>
    </div>
  );
}

export default App;
