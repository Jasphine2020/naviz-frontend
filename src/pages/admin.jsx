import '../App.css';
import '../jasphine.css'


import { ProductForm } from "../components/product-form"
import { Orders } from "../components/orders"

export const Admin = () => {
    return (
        <main className="w-full flex-center column">
            <ProductForm/>
            <Orders />
        </main>
    )
}
