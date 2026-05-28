'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  attr1: z.string().min(1, 'Attribute 1 is required'),
  attr2: z.string().min(1, 'Attribute 2 is required'),
  attr3: z.string().min(1, 'Attribute 3 is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function ProductForm(props: {
  onSubmit: (formData: FormData) => Promise<void>;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      attr1: '',
      attr2: '',
      attr3: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('attr1', data.attr1);
    formData.append('attr2', data.attr2);
    formData.append('attr3', data.attr3);

    try {
      await props.onSubmit(formData);
      reset();
      props.onClose();
    } catch (err) {
      toast.error('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="attr1">Attribute 1</Label>
        <Input
          id="attr1"
          placeholder="Enter attribute 1"
          {...register('attr1')}
          className={errors.attr1 ? 'border-destructive' : ''}
        />
        {errors.attr1 && (
          <p className="text-sm text-destructive mt-1">{errors.attr1.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="attr2">Attribute 2</Label>
        <Input
          id="attr2"
          placeholder="Enter attribute 2"
          {...register('attr2')}
          className={errors.attr2 ? 'border-destructive' : ''}
        />
        {errors.attr2 && (
          <p className="text-sm text-destructive mt-1">{errors.attr2.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="attr3">Attribute 3</Label>
        <Input
          id="attr3"
          placeholder="Enter attribute 3"
          {...register('attr3')}
          className={errors.attr3 ? 'border-destructive' : ''}
        />
        {errors.attr3 && (
          <p className="text-sm text-destructive mt-1">{errors.attr3.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  );
}
