import { useEditorStore } from "@/store";
import { MonitorIcon, TabletIcon, SmartphoneIcon } from "lucide-react";
import { useState } from "react";

const Devices = () => {
  const { editor } = useEditorStore();
  const [activeDevice, setActiveDevice] = useState<string>("desktop");

  const setDevice = (device: string) => {
    if (!editor) return;

    editor?.Devices.select(device);
    setActiveDevice(device);

    // Dynamically set the canvas width
    const canvas = editor?.Canvas.getFrameEl();
    if (canvas) {
      switch (device) {
        case "desktop":
          canvas.style.width = "1024px";
          break;
        case "tablet":
          canvas.style.width = "690px";
          break;
        case "mobile":
          canvas.style.width = "320px";
          break;
        default:
          canvas.style.width = "100%";
      }
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <button
        className={`rounded-xl p-2 ${
          activeDevice === "desktop"
            ? "text-blue-600 bg-gray-100"
            : "text-gray-400 hover:bg-gray-100"
        }`}
        onClick={() => setDevice("desktop")}
      >
        <MonitorIcon className="h-6 w-6 stroke-current" />
      </button>
      <button
        className={`rounded-xl p-2 ${
          activeDevice === "tablet"
            ? "text-blue-600 bg-gray-100"
            : "text-gray-400 hover:bg-gray-100"
        }`}
        onClick={() => setDevice("tablet")}
      >
        <TabletIcon className="h-6 w-6 stroke-current" />
      </button>
      <button
        className={`rounded-xl p-2 ${
          activeDevice === "mobile"
            ? "text-blue-600 bg-gray-100"
            : "text-gray-400 hover:bg-gray-100"
        }`}
        onClick={() => setDevice("mobile")}
      >
        <SmartphoneIcon className="h-6 w-6 stroke-current" />
      </button>
    </div>
  );
};

export default Devices;
