import { supabase } from './supabase';

export type Product = {
  id: string;
  name: string;
  price: number;
  barcode: string;
  category?: string;
  stock: number;
  discount: number;
};

// ✅ Get product by barcode (for scanner use)
export async function getProductByBarcode(barcode: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('barcode', barcode)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product by barcode:', error.message);
    throw error;
  }

  return data as Product | null;
}

// ✅ List all products (sorted alphabetically)
export async function listProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error listing products:', error.message);
    throw error;
  }

  return data as Product[];
}

// ✅ Add or update product (restricted by RLS: only employees can write)
export async function upsertProduct(p: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .upsert(p, { onConflict: 'id' }) // ensures id uniqueness
    .select()
    .single();

  if (error) {
    console.error('Error upserting product:', error.message);
    throw error;
  }

  return data as Product;
}

// ✅ Delete product (restricted by RLS: only employees can delete)
export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Error deleting product:', error.message);
    throw error;
  }
}
