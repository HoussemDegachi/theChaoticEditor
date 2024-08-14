import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { FilePen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FileList from "./FileList";

function RenameFile({ item }) {
  const [name, setName] = useState(item.name || "");
  const { updateFile, deleteFile } = useFileBarDataProvider();
  const ref = useRef(null);

  const saveChanges = () => {
    if (name) updateFile(item.id, { name, type: item.toBeType });
    else if (item.name)
      updateFile(item.id, { name: item.name, type: item.toBeType });
    else deleteFile(item.id);
  };

  const handleClickOutSide = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      saveChanges();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveChanges();
  };

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <FilePen size={16} />
          <input
            name="name"
            value={name}
            ref={ref}
            onChange={handleChange}
            autoFocus
            className="bg-slate-700 outline-none w-full px-1 focus:ring-2"
          />
        </div>
      </form>
      <div className="pl-3">
        {item?.contents?.map((file) => (
          <FileList file={file} key={file.id} />
        ))}
      </div>
    </div>
  );
}

export default RenameFile;
