'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Import our SKU and EAN generators
import { generateSKU, generateEAN13 } from '@/lib/sku/utils';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const attr1 = formData.get('attr1') as string;
  const attr2 = formData.get('attr2') as string;
  const attr3 = formData.get('attr3') as string;

  // Get the next sequence number
  const lastProduct = await prisma.product.findFirst({
    orderBy: { sequence: 'desc' },
    select: { sequence: true },
  });

  const nextSequence = lastProduct ? lastProduct.sequence + 1 : 1;

  const sku = generateSKU(name, attr1, attr2, nextSequence);
  const ean13 = generateEAN13(nextSequence);

  await prisma.product.create({
    data: {
      name,
      attr1,
      attr2,
      attr3,
      sku,
      ean13,
      sequence: nextSequence,
    },
  });

  revalidatePath('/products');
}

export async function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath('/products');
}