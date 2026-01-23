"use client"
import { useRef, useState } from "react";
import { LinkedList, product } from "./Classes/LinkedList";

export default function Home() {
  const nameRefInb= useRef<HTMLInputElement>(null);
  const quantityRefInb= useRef<HTMLInputElement>(null);
  const { current: x } = useRef(new LinkedList());

  let [products, setProducts] = useState<Array<product>>([]);
  
  const handle_submitLast=(event:React.MouseEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const name= nameRefInb.current?.value || "";
    const quantity= quantityRefInb.current?.value || 0
    if (name && quantity) {
      x.insert_end(name, +quantity)
      setProducts(x.toArray());
    }
  }

  const handle_submitFirst = (e:React.MouseEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const name= nameRefInb.current?.value || "";
    const quantity= quantityRefInb.current?.value || 0
    if (name && quantity) {
      x.insert_first(name, +quantity)
      setProducts(x.toArray());
    }
   }
  
  const handleUpdate = (id:number, quantity:number):void => { 
    const userInput = prompt("Edit the quantity" + id, quantity?.toString());
    !Number.isNaN(+userInput) && x.editProduct(id, userInput);
    x.editProduct(id, userInput ? +userInput : quantity);
    setProducts(x.toArray());
  }
  const handleDelete = (id:number):void => { 
    x.deleteNode(id);
    setProducts(x.toArray());
  }
  const isHead = (id: number): boolean => {
    return x.head?.id === id;
  };
  const isTail = (id: number): boolean => {
    return x.tail?.id === id;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mx-auto text-4xl">Simple Ware-House - Doubly LinkedList</h1>
        <form className="p-8 p-6 rounded m-auto border-2 border-red-300">
        <div>
          <label htmlFor="product-name">Product Name:</label>
          <input type="text" id="product-name" name="name" className="border-[3px] border-[#eee]" ref={nameRefInb} />
        </div>
        <div>
          <label htmlFor="product-quantity">Product Quantity:</label>
          <input type="number" id="product-quantity" name="quantity" className="border-[3px] border-[#eee]" ref={quantityRefInb} />
        </div>
        <button onClick={(e)=>handle_submitFirst(e)} className="bg-amber-300 p-2" >Insert First</button>
        <button onClick={(e)=>handle_submitLast(e)} className="bg-amber-300 p-2 ml-1" >Insert Last</button>
        </form>
        <div id="list" className="p-[2rem] bg-amber-300 min-w-[100%]">
          <ul>
            { products.map((prod)=>(
              <li key={prod.id} className="flex items-center justify-between">
                <p>{isHead(prod.id) && <span className="bg-green-400 p-1.5 font-bold">Head</span>}
                {isTail(prod.id) && <span className="bg-blue-400 p-1.5 font-bold">Tail</span>}
                  name: {prod.name} - Quantity: {prod.quantity}
                </p>
                <div className="flex gap-1">
                  <button className="bg-red-400 p-1.5 font-bold" onClick={() => handleUpdate(prod.id,prod.quantity)}>Update</button>
                  <button className="bg-red-400 p-1.5 font-bold" onClick={() => handleDelete(prod.id)}>X</button>
                </div>
              </li>
            )) }
          </ul>
        </div>
      </main>
    </div>
  );
}
