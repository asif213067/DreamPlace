"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteDestinationDialogProps {
  destinationId: string;
}

interface DeleteResponse {
  message?: string;
  deletedCount?: number;
}

const DeleteDestinationDialog = ({
  destinationId,
}: DeleteDestinationDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!destinationId || isDeleting) return;

    setIsDeleting(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

      const res = await fetch(
        `${baseUrl}/destination/${encodeURIComponent(destinationId)}`,
        {
          method: "DELETE",
        },
      );

      const data = (await res
        .json()
        .catch(() => null)) as DeleteResponse | null;

      if (!res.ok) {
        toast.error(data?.message || "Failed to delete destination.");
        return;
      }

      toast.success("Destination deleted successfully!");

      setOpen(false);

      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error("Delete destination error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            disabled={isDeleting}
            className="inline-flex h-10 shrink-0 flex-row flex-nowrap items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 shadow-sm transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-[0.97] disabled:opacity-50"
          >
            <Trash2 size={16} strokeWidth={2} className="shrink-0" />
            <span className="whitespace-nowrap">Delete</span>
          </Button>
        }
      />

      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-106.25">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-slate-800">
            Delete Destination?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-slate-500">
            Are you sure you want to permanently delete this destination? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          <Button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-red-600 text-white shadow-none transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
