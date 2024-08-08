import React from "react";
import RenderData from "./RenderData";

export default function Fruits() {
  const fruits = ["Apple", "Banana", "Mango", "Orange", "Watermelon","Grapes"];
  const vegetables = ["tomato", "potato", "carrot"];
  const fruitsPrice=[1,2,3,4,5];
  const vagetablesPrice=[2,4,6,8,10]
  return (
    <div>
      Fruits
     <RenderData data={fruits} price={fruitsPrice}/>
     <RenderData data={vegetables} price={vagetablesPrice}/>
    </div>
  );
}
