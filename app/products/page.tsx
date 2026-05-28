"use client";

import { ProductForm } from "@/components/product/form";
import { ProductTable } from "@/components/product/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = async (formData: FormData) => {
    try {
      // Call the server action
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      toast.success("Product created successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Product SKU Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create products and generate SKUs and EAN-13 codes.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Fill in the product details to generate SKU and EAN-13.
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleCreate}
              onClose={() => setOpen(false)}
            />
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ProductTable onDelete={handleDelete} deletingId={deletingId} />
      </div>
    </main>
  );
}
