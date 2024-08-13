import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable.jsx";
import FileBar from "./FileBar.jsx";
import EditorSection from "./EditorSection.jsx";
import { FileBarDataProvider } from "@/contexts/FileBarDataProvider.jsx";


function index() {
  return (
    // create a resizable panel with two sides
    <ResizablePanelGroup
    direction="horizontal"
    className="w-full min-h-[100dvh] max-h-[100dvh]"
  >
      {/* small side is for file bar */}
      <ResizablePanel defaultSize={20}>
        <div className="h-full">
          <FileBarDataProvider>
            <FileBar />
          </FileBarDataProvider>
        </div>
      </ResizablePanel>
      <ResizableHandle className={"bg-neutral-400"} />
      {/* large side is for code editor section */}
      <ResizablePanel defaultSize={80}>
        <div className="h-full">
          <EditorSection />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default index;
