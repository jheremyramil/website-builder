import { useEditor } from "@/context/EditorContext";
import { MonitorIcon, TabletIcon, SmartphoneIcon } from "lucide-react";
import React from "react";

const Devices = () => {
  const { editor } = useEditor();

  const setDevice = (device: string) => {
    editor?.Devices.select(device);
  };

  return (
    <div className="flex items-center gap-x-3">
      <button
        className="rounded-xl p-2 text-blue-600 bg-gray-100"
        onClick={() => setDevice("desktop")}
      >
        <MonitorIcon className="h-6 w-6 stroke-current" />
      </button>
      <button
        className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
        onClick={() => setDevice("tablet")}
      >
        <TabletIcon className="h-6 w-6 stroke-current" />
      </button>
      <button
        className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
        onClick={() => setDevice("mobile")}
      >
        <SmartphoneIcon className="h-6 w-6 stroke-current" />
      </button>
    </div>
  );
};

export default Devices;
