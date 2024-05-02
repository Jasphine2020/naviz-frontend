import '../App.css';
import '../jasphine.css'

import { Navigation } from "../components/nav"
import { ProductGrid } from "../components/product-grid"

export const Home = () => {
    return (
        <main>
            <Navigation />
            <ProductGrid />
        </main>
    )
}
