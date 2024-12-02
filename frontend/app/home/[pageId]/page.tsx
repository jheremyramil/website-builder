import withAuth from "@/lib/withAuth";

const PageDetail = ({ params }: { params: { pageId: string } }) => {
  return <div>Details for Page ID: {params.pageId}</div>;
};

export default withAuth(PageDetail);
