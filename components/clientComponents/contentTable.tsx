"use client";
import { typeForFilteredContentsToBuildTable } from "@/app/customTypes/types";
import { Button } from "../ui/button";
import { useFormTypeId } from "@/app/contexts/contentFormRelatedContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const ContentTable = ({
  filteredContents,
}: {
  filteredContents: typeForFilteredContentsToBuildTable;
}) => {
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    setContentForEditting,
    setContentOfType,
    openDialog,
    setOpenDialog,
    setIsAddingState,
  } = useFormTypeId();

  async function onEdit(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/contents/oneDynamicContent?id=${id}`);
      const result = await res.json();
      if (result.success && result.data) {
        const data = result.data;
        setContentForEditting(data);
        setContentOfType(data[0].content_types.name.toLowerCase());
        setIsAddingState(false);
        setOpenDialog(true);
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage("something went wrong");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  }

  async function onDelete(id: string) {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/contents/deleteOneDynamicContent?id=${id}`,
        {
          method: "DELETE",
        },
      );
      const result = await res.json();
      console.log("resulllllllllll", result)
      if (!result.success) {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage("something went wrong");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
        setDeletedId(null);
      }, 4000);
    }
  }
  if (!filteredContents) {
    return <p>Loadding...</p>;
  }

  return (
    <div className="overflow-x-auto w-full border rounded-md shadow-md mx-3">
      <table className="min-w-[950px] border-collapse">
        <caption className="text-center font-bold text-blue-700">
          Table contents
        </caption>
        <thead className="text-green-500 font-bold">
          <tr className="hover:bg-green-400 hover:text-blue-900">
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Title</th>
            <th className="border px-4 py-2 text-left">Part</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Tech ID</th>
            <th className="border px-4 py-2 text-left">Category ID</th>
            <th className="border px-4 py-2 text-left">Content Type</th>
            <th className="border px-4 py-2 text-left">Created By</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContents.map((item) => (
            <tr key={item.id} className="hover:bg-gray-500">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.part}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.tech_id}</td>
              <td className="border px-4 py-2">{item.category_id}</td>
              <td className="border px-4 py-2">{item.content_types.name}</td>
              <td className="border px-4 py-2">{item.created_by}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <Button
                  onClick={() => onEdit(item.id)}
                  className="px-2 cursor-pointer py-1 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Wait..." : "Edit"}
                </Button>
                <Button
                  onClick={() => setDeletedId(item.id)}
                  className="bg-red-500 cursor-pointer hover:bg-red-600"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletedId && (
        <Dialog
          open={deletedId ? true : false}
          onOpenChange={() => setDeletedId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setDeletedId(null)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-500 cursor-pointer"
                onClick={() => onDelete(deletedId)}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {message && <p className="text-[17px] text-red-500">{message}</p>}
    </div>
  );
};

export default ContentTable;
