import { Input } from "@/ui/input";
import { useEffect, useState } from "react";

type Props = {
   handler: (param: string) => Promise<[]>;
   children: (props: { items: any[]; loading: boolean; str?: string; reset?: () => void }) => React.ReactNode;
   label?: string;
};
export function DebounceSearch({ handler, children, label }: Props) {
   const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState(false);
   const [list, setList] = useState([]);

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
   };

   const searchHandler = async (str: string) => {
      if (str) {
         try {
            setLoading(true);
            const data = await handler(str);
            setLoading(false);
            if (data && Array.isArray(data)) {
               setList(data);
            } else {
               setList([]);
            }
         } catch (error) {
            setLoading(false);
         }
      }
   };

   const reset = () => {
      setList([]);
      setSearchTerm("");
   };
   useEffect(() => {
      const debounceTimer = setTimeout(() => {
         searchHandler(searchTerm);
      }, 1000);
      return () => {
         clearTimeout(debounceTimer);
      };
   }, [searchTerm]);

   return (
      <>
         <Input //
            placeholder="Search User"
            label={label}
            className="h-9"
            onChange={handleInputChange}
            value={searchTerm}
         />
         {children({ items: list || list, loading: loading, str: searchTerm, reset })}
      </>
   );
}
