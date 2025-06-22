import { slugify } from "@/utils/slugify";

const handleSaveAndPublish = async ({
  editor,
  selectedPage,
  toast,
  setOpenModal,
  setPublicLink,
}: {
  editor: any;
  selectedPage: any;
  toast: any;
  setOpenModal: (open: boolean) => void;
  setPublicLink: (link: string) => void;
}) => {
  if (!editor || !selectedPage) return;

  try {
    const data = editor.getProjectData();
    const html = editor.getHtml();
    const css = editor.getCss();

    if (data && html && css) {
      const response = await editor.StorageManager.store(data);

      const slugName = slugify(selectedPage.name || "untitled-page");

      localStorage.setItem(`preview_html_${slugName}`, html);
      localStorage.setItem(`preview_css_${slugName}`, css);
      localStorage.setItem(
        `preview_project_data_${slugName}`,
        JSON.stringify(data)
      );

      const link = `/${selectedPage.user_id}/${selectedPage.slug}`;
      setPublicLink(link);
      setOpenModal(true);
    }
  } catch (error: any) {
    toast({
      title: "Something went wrong!",
      variant: "destructive",
      description:
        error?.message ||
        "An unexpected error occurred. Please contact system administrator",
    });
  }
};

export default handleSaveAndPublish;
