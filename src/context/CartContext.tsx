import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '../services/products';

type CartItem = Product & { qty: number; finalPrice: number };
type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
};
const Ctx = createContext<CartCtx>({} as any);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id);
      const finalPrice = Number((p.price * (1 - p.discount / 100)).toFixed(2));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...p, qty: 1, finalPrice }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const total = useMemo(() => items.reduce((sum, i) => sum + i.finalPrice * i.qty, 0), [items]);

  return <Ctx.Provider value={{ items, add, remove, clear, total }}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
