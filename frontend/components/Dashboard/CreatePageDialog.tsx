"use client";

import { createPageAction } from "@/actions";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "../ui";
import { useToast } from "@/hooks";
import { usePageStore } from "@/store";

const CreatePageDialog = () => {
  const { toast } = useToast();
  const { addPage } = usePageStore();
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    createPageAction,
    undefined
  );

  useEffect(() => {
    if (state?.page && !isPending) {
      toast({
        title: "Page Created!",
        variant: "success",
      });

      addPage(state.page);
      setOpen(false);
    }
  }, [state, isPending, addPage]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" mt-6 py-3  hover:bg-black focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 rounded-full shadow-sm"
          variant="default"
          size="lg"
        >
          Create Page
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 rounded-xl overflow-hidden border-0 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 "></div>
          <DialogHeader className="relative px-8 pt-8">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Page
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 mt-2">
              Start building your content in the editor
            </DialogDescription>
          </DialogHeader>

          <div className="relative px-8 pb-8 mt-6">
            <Form action={action}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Page Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter page name"
                    className="w-full px-4 py-3 text-black dark:text-white"
                  />

                  {state?.errors?.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {state.errors.name}
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className=" py-3 w-full hover:bg-black focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 rounded-30 shadow-sm"
                    variant="default"
                    size="lg"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      "Create Page"
                    )}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageDialog;
