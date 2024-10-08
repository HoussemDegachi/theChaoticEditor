import React, { useState } from "react";
import { ChevronDown, ChevronRight, FolderPlus, FilePlus2 } from "lucide-react";
import FileList from "./FileList";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";

function Folder({ folder }) {
  const [open, setOpen] = useState(false);
  const { createFile } = useFileBarDataProvider();

  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((state) => !state);
  };

  const addNewFolder = (e) => {
    e.stopPropagation();
    setOpen(true);
    createFile("folder", folder.id);
  };

  const addNewFile = (e) => {
    e.stopPropagation();
    setOpen(true);
    createFile("file", folder.id);
  };

  return (
    <div onClick={toggleOpen} className="cursor-pointer rounded-sm">
      <div className="flex items-center justify-between hover:bg-gray-700 text-neutral-300 group">
        <div className="flex items-center gap-0.5 whitespace-nowrap overflow-hidden">
          <div className="flex-1">
            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          <span>{folder.name}</span>
        </div>
        <div className="mx-1 flex gap-1 opacity-0 group-hover:opacity-100 duration-100">
          <button>
            <FilePlus2
              size={16}
              onClick={addNewFile}
              className="opacity-50 hover:opacity-100"
            />
          </button>
          <button>
            <FolderPlus
              size={16}
              onClick={addNewFolder}
              className="opacity-50 hover:opacity-100"
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="pl-3">
          {folder?.contents?.map((file) => (
            <FileList file={file} key={file.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Folder;
