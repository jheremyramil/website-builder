"use client";

const RightSidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-[300px] bg-[#444] border-l border-[#444]">
      <div
        id="layers-container"
        className="overflow-y-auto scrollbar-thin text-black-900"
      ></div>
      <div
        id="styles-container"
        className="overflow-y-auto scrollbar-thin text-black-900"
      ></div>
      <div
        id="traits-container"
        className="overflow-y-auto scrollbar-thin text-black-900"
      ></div>
    </aside>
  );
};

export default RightSidebar;
