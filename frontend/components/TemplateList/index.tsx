import Link from "next/link";
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { use } from "react";

const TemplateList = ({
  templatesPromise,
}: {
  templatesPromise: Promise<any>;
}) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>HTML</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {templates?.length ? (
          templates?.map((template: any) => (
            <TableRow key={template.id}>
              <TableCell>{template.id}</TableCell>
              <TableCell>{template.html}</TableCell>
              <TableCell>{template.created_at}</TableCell>
              <TableCell>
                <Link href={`/editor/${template.id}`}>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div className="text-xl font-semibold leading-6">
            No Templates to show!
          </div>
        )} */}
      </TableBody>
    </Table>
  );
};

export default TemplateList;
