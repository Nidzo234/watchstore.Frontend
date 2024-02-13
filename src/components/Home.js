import { useEffect, useState } from "react"
import Products from "./products"
export default function Home({name}) {
    
    return(
        <div>
            <h1>{name ? "hi " + name : "Nema logiran korisnik"}</h1>
            <Products></Products>
        </div>
    )
}