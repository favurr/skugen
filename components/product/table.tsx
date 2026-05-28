'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

type Product = {
  id: number;
  name: string;
  attr1: string;
  attr2: string;
  attr3: string;
  sku: string;
  ean13: string;
  sequence: number;
  createdAt: Date;
};

export function ProductTable(props: {
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await props.onDelete(id);
      // Optimistically remove the product
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    }
  }

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">SKU</TableHead>
            <TableHead className="w-20">EAN-13</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Attribute 1</TableHead>
            <TableHead>Attribute 2</TableHead>
            <TableHead>Attribute 3</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell className="font-mono">{product.sku}</TableCell>
              <TableCell className="font-mono">{product.ean13}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.attr1}</TableCell>
              <TableCell>{product.attr2}</TableCell>
              <TableCell>{product.attr3}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  disabled={props.deletingId === product.id}
                  aria-label="Delete"
                >
                  {/* You can use a trash icon from lucide-react if available */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}