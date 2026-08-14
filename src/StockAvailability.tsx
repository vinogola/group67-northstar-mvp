import React,{ useState } from "react"; 

type product = {
  name: string;
  stock: number ;
  ] ;

const products:[] = [
  { name: "classic T-Shirt" , stock: 
24 } ,

  { name: "Runnning Shoes" , stock: 8 } ,
   { name: "Denim Jacket" , stock: 0 } ,
    { name:"School Backpack" , stock: 
15 } ,
     ] ;

     export default function StockAvailability() {
       const [Item,setItem] = useState("") ;
    const [result,setResult] = useState<product |
    null>(null) ;
    const [checked,setChecked] = useState(false) ;

    const checkAvaillability = () => {
    const product = products.find(
      (p) => p.name.toLowerCase() ===
        item.trim().toLowerCase()
      };

    setResult(product || null);
    setChecked(true);
   };
 
   return(
     <div className="max-w-xI MX-AUTO P-6">
     <h2 className="text -2xI font-bold mb-2">
     Stock Avalability
     </h2>
     <p className="text-gray-600 mb-4">
     check wrether an item is currently
     available.
   </p>

     <div className="flex gap-2">
     <input
     type="text"
     value={item}
     onchange={(e) => {
       setItem(e.target.value);
       setChecked(false);
     }}
     placeholder="Enter item name"
     className="flex-1border rounded-1g
     px-3 py-2"
     />
     <button
     onclick={checkAvalability}
     className="rounded-1g px-4 py-2
     font-semibold bg-blue-600 text-white"
     >

     check
   </button>
   </div>

     {checked && result && (
     <div className="text-green-700">
     p-4">
            <h3
     className="font-semibold">{result.name}</h3>

    {result.stock>0 ? (
       available

                 </p>
               ) : (
                 <p className="text-red-700">
                   out of stock
              </p>
            )}
       </div>
       )}

     {checked && |results && (
       <div className="mt-4 border rounded-1g
       p-4">

               <p>Item not found.please check the item name.</p>
       <div>
       ) ;
     

       <div className="mt-4 text-sm
       text-gray-500">
       Avalability resuls are designed for 
       rapid customer self-service.
            </div>
        </div>
    ) ;
 }       

  
     
     
   
    
    
    
    
  
