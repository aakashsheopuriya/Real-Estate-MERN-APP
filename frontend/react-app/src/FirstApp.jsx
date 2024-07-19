import React from "react";


function FirstApp(){

    const amount=19;
    console.log("amount=",amount);

   return(
    <div>
        <h1>
            Increament/Decreament App
        </h1>
        <button onClick={()=>alert("hello all on increament")}>+</button>
        <span>{amount}</span>
        <button onClick={()=>alert("hello all on decreament")}>-</button>
    </div>
   )

}

export default FirstApp