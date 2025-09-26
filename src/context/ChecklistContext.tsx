import React,{createContext,useContext,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Item={ id:string; name:string; checked:boolean; };
const Ctx=createContext<any>({});
export function ChecklistProvider({children}:{children:React.ReactNode}) {
  const [items,setItems]=useState<Item[]>([]);
  useEffect(()=>{ AsyncStorage.getItem('checklist').then(j=> j&&setItems(JSON.parse(j))); },[]);
  useEffect(()=>{ AsyncStorage.setItem('checklist', JSON.stringify(items)); },[items]);
  const add=(name:string)=> setItems(prev=> [...prev,{id:Date.now().toString(), name, checked:false}]);
  const toggle=(id:string)=> setItems(prev=> prev.map(i=> i.id===id? {...i, checked:!i.checked}: i));
  const remove=(id:string)=> setItems(prev=> prev.filter(i=>i.id!==id));
  return <Ctx.Provider value={{items, add, toggle, remove}}>{children}</Ctx.Provider>;
}
export const useChecklist=()=>useContext(Ctx);
