import feature1 from '../images/feature-1.jpg'
import { AppContext } from '../App'
import { useContext } from 'react'


export const ProductGrid = () => {

    const { products,selections,  setSelections} = useContext(AppContext);
    
    function addToCart(event) {
        var id = event.target.id;
        var current = selections;
        current.push(Number(id))
        setSelections(current)
        alert('Added successfully')
    }

    return (
        <div className="w-full flex-center wrap p10">

            {
                products.map((item) => (
                    <div className="w-quater m10 relative w-min300" key={item.id}>
                        <img className="w-full"
                            src={'https://naviz-backend-jv5x.onrender.com/images/'+item.image}
                            alt="feature image">
                        </img>

                        <div className="w-full m3-h p3 center absolute white-fg" style={{ top: '0', left: '0', backgroundColor:'rgba(0, 0, 0, .4)' }   } >
                            <p className="italic">{item['name']} {item['specs'] }</p>
                            <p className="bold">UGX { item['price'] }</p>
                        </div>

                        <button id={item.id} onClick={addToCart} className="w-full green-bg white-fg f11 p10 pointer">Add to Cart</button>
                    </div>
                ))
            }
            
        </div>
        
    )
}
