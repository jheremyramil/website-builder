import { Table } from "lucide-react";
import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
} from "../ui";
import Link from "next/link";

interface TemplateListProps {
  templates: any;
}

const TemplateList = ({ templates }: TemplateListProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.length ? (
          templates?.map((template: any) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.createdAt}</TableCell>
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
          <h3 className="text-xl font-semibold leading-6">
            No Templates to show!
          </h3>
        )}
      </TableBody>
    </Table>
  );
};

export default TemplateList;
