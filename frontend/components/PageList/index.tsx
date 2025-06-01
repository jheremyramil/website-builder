"use client";

import { usePageStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import Spinner from "../ui/spinner";
import { getPagesByUserAction } from "@/actions";

const PageList = () => {
  const { pages, currentPage, totalPages, setPages } = usePageStore();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchPages = async (page: number) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await getPagesByUserAction(page);

      if (!response || !response.data) {
        console.warn("No data returned from API.");
        setPages([], 1, 0);
        return;
      }

      const { data, current_page, last_page } = response;
      setPages(data, current_page, last_page);
    } catch (error) {
      console.error("Error fetching pages:", error);
      setHasError(true);
      setPages([], 1, 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPages(pages, page, totalPages);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <p className="text-center text-xl font-semibold py-6 text-red-600">
        Failed to load pages. Please try again later.
      </p>
    );
  }

  return (
    <>
      {!pages?.length ? (
        <p className="text-center text-xl font-semibold py-6">
          No Pages to show!
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.id}</TableCell>
                  <TableCell>{page.name}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>
                    <Link href={`/editor/${page.id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination className="mt-4 flex justify-center items-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
};

export default PageList;
