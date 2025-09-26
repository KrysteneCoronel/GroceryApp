import React,{createContext,useContext,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Fav = { id: string; name: string; };
const Ctx = createContext<any>({});
export function FavoritesProvider({children}:{children:React.ReactNode}) {
  const [favorites,setFavorites]=useState<Fav[]>([]);
  useEffect(()=>{ AsyncStorage.getItem('favorites').then(j=> j&&setFavorites(JSON.parse(j))); },[]);
  useEffect(()=>{ AsyncStorage.setItem('favorites', JSON.stringify(favorites)); },[favorites]);
  const add=(f:Fav)=> setFavorites(prev=> prev.find(x=>x.id===f.id)? prev: [...prev,f]);
  const remove=(id:string)=> setFavorites(prev=> prev.filter(f=>f.id!==id));
  return <Ctx.Provider value={{favorites, add, remove}}>{children}</Ctx.Provider>;
}
export const useFavorites=()=>useContext(Ctx);
