"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";

import type { Destination } from "@/components/destinations/destination-card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Luxury",
];

type EditDestinationForm = Omit<Destination, "price"> & {
  price: string;
};

interface EditDestinationDialogProps {
  destination: Destination;
}

const getTodayDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

const EditDestinationDialog = ({ destination }: EditDestinationDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<EditDestinationForm>(() => ({
    ...destination,
    price: String(destination.price),
  }));

  const [today] = useState(getTodayDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof EditDestinationForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = Number(form.price);

    if (!Number.isFinite(price) || price < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { _id, ...rest } = form;

      const payload = {
        ...rest,
        price,
      };

      const res = await fetch(
        `http://localhost:5000/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!res.ok) {
        toast.error(result?.message || "Failed to update destination.");
        return;
      }

      toast.success("Destination updated successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Destination update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#0aa3bd]/30 bg-[#0aa3bd]/10 px-4 py-2 text-sm font-medium text-[#0aa3bd] shadow-none transition-all duration-200 hover:border-[#0aa3bd] hover:bg-[#0aa3bd] hover:text-white"
          >
            <Pencil size={16} />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[600px] overflow-y-auto sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Edit Destination
          </DialogTitle>

          <DialogDescription>
            Update your destination information and travel package details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Destination Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              placeholder="Bali Paradise"
              className="bg-slate-50"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          {/* Country and Category */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Indonesia"
                className="bg-slate-50"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) => updateField("category", value ?? "")}
              >
                <SelectTrigger id="category" className="w-full bg-slate-50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 1299"
                className="bg-slate-50"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g. 7 Days, 6 Nights"
                className="bg-slate-50"
                value={form.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              min={today}
              className="bg-slate-50"
              value={form.departureDate}
              onChange={(e) => updateField("departureDate", e.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="bg-slate-50"
              value={form.imageUrl}
              onChange={(e) => updateField("imageUrl", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Describe the travel experience..."
              className="resize-none bg-slate-50"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
              className="border border-slate-200 bg-white text-slate-600 shadow-none transition hover:bg-slate-100 hover:text-slate-800"
            >
              <X size={16} />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0aa3bd] text-white shadow-sm transition hover:bg-[#078ba2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {isSubmitting ? "Updating..." : "Update Destination"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
