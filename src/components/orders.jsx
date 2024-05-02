import axios from "axios"
import { useContext, useEffect, useState } from "react"

export const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('http://127.0.0.1:8000/orders')
            setOrders(response.data.orders)
        }
        fetchOrders()
    },[])
    
    return (
        <>
            <div className="w-full center m30-h">
                <h3>Orders</h3>
            </div>
            {
                orders.map((order) => (
                    <div className="w-half w-min300 b2 dashed b-green p8 m8" key={order['id']}>
                        <p>ORDER DATE: <span className="bold">{order.timestamp}</span></p>
                        <p>Name: <span className="bold">{order.credentials['name']}</span></p>
                        <p>Address: <span className="bold">{order.credentials['address']}</span></p>
                        <p>Contact: <span className="bold">{order.credentials['contact']}</span></p>
                        <br />
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="left">Item</th>
                                    <th className="left">Quantity</th>
                                    <th className="left">Price</th>
                                    <th className="left">Amount</th>
                                </tr>
                            </thead>
                            
                            {
                                order.orders.map((item) => (
                                    <tbody>
                                        <tr key={item['id']}>
                                            <td className="left">{ item['name'] }</td>
                                            <td className="left">{ item['quantity']}</td>
                                            <td className="left">{ item['price']}</td>
                                            <td className="left">{ (item['quantity'])*(item['price']) }</td>
                                        </tr>
                                    </tbody>
                                ))
                            }

                        </table>
                    </div>
                ))
            }
        </>
    )
}
