import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { BrushIcon, LayersIcon } from "lucide-react";

const RightSidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-[300px] bg-white border-l border-gray-200">
      <Tabs defaultValue="layers">
        <TabsList className="flex justify-between p-2 border-b border-gray-200 ">
          {/* Tab triggers */}
          <TabsTrigger
            value="layers"
            className="text-sm font-medium rounded-md gap-x-2"
          >
            <LayersIcon className="h-5 w-5 stroke-current text-pink-600" />
            Layers
          </TabsTrigger>

          <TabsTrigger
            value="styles"
            className="text-sm font-medium rounded-md gap-x-2 text-gray-400 hover:text-pink-600"
          >
            <BrushIcon className="h-5 w-5 stroke-current" />
            Styles
          </TabsTrigger>
          {/* <TabsTrigger value="traits" className="text-sm font-medium">
            Traits
          </TabsTrigger> */}
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          {/* Tab contents */}
          <TabsContent value="layers" className="h-[80vh] overflow-y-auto p-4">
            <div
              id="layers-container"
              className="overflow-y-auto scrollbar-thin text-black-900"
            ></div>
          </TabsContent>

          <TabsContent value="styles" className="h-[80vh] overflow-y-auto p-4">
            <div
              id="styles-container"
              className="overflow-y-auto scrollbar-thin text-black-900"
            ></div>
          </TabsContent>

          {/* <TabsContent value="traits" className="h-[80vh] overflow-y-auto p-4">
            <div
              id="traits-container"
              className="overflow-y-auto scrollbar-thin text-black-900"
            > 
            </div>
          </TabsContent> */}
        </div>
      </Tabs>

      {/*
       * Make it to tabs so that it will have a nice layout
       * All width fixed height and overflow-y-auto
       * e.g h-[80vh] or less, same with Left Sidebar
       * Use TailwindCSS and Shad/cn UI components for styling
       */}
    </aside>
  );
};

export default RightSidebar;
