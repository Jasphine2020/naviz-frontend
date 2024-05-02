import '../App.css';
import '../jasphine.css'
import logo from '../logo.png'
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import image from '../images/feature-3.jpg'
import axios from 'axios';


export const Cart = () => {

    const { orders, setOrders, flags, setFlags, selections, all, priceValue, setPriceValue, grandTotal, setGrandTotal,orderForm, setOrderForm, cart, setCart} = useContext(AppContext)

    useEffect(() => {
        async function sendOrder() {
            const response = await axios.post('http://127.0.0.1:8000/orders', orders)
        }
        sendOrder()
    }, [orders])

    var productIds = []
    var choices = []

    for (let i = 0; i < all.length; i++){
        let testObject = all[i].id
        if (selections.includes(testObject)) {
            choices.push(all[i])
            productIds.push("item-".concat(String(testObject)))
        }
    }

    function valueChanged(event) {
        let id = 'item-' + event.target.id
        let quantity = parseInt(event.target.value)
        var pName
        var pPrice
        for (let i = 0; i < all.length; i++){
            if (all[i]['id'] == Number(event.target.id)) {
                pName = all[i]['name']
                pPrice = all[i]['price']
            }
        }

        var newOrder = { 'id': event.target.id, 'name': pName, 'price': pPrice, 'quantity': quantity }

        if (flags.includes(id)) {
            let position = flags.indexOf(id)
            let prev = cart
            prev.splice(position, 1, newOrder)
            setCart(prev)
        } else {
            let prevItem = flags
            setFlags([...prevItem, id])
            let prev = cart
            setCart([...prev, newOrder])
        }
                
        let amount = quantity * priceValue
        document.getElementById(id).innerText = amount
        evaluateGrandTotal()
        setGrandTotal(total)

    }

    var total = 0
    function evaluateGrandTotal() {
        total = 0
        for (let i = 0; i < productIds.length; i++){
            let amount = document.getElementById(productIds[i]).innerText
            total += parseInt(amount)
        }
    }

    function handleFormChange(e) {
        const { name, value } = e.target
        setOrderForm({ ...orderForm, [name]: value })
    }

    function submitOrder(e) {
        e.preventDefault()
        setOrders({
            'credentials': orderForm,
            'orders': cart
        })
        alert('order submitted successfully')
    }

    return (
        <main className='w-full flex-center column'>
            <div className="m20-w w-quater">
                <img className='w-full'
                    src={logo}
                    alt="logo"
                ></img>
            </div>
            <section className='w-full flex-center wrap'>
                {
                    choices.map((choice) => (
                        <div key={choice.id} className='w-half flex-even wrap m10 round-m b2 solid b-green w-min300 b-box'>
                            <div className='p10 flex-center column'>
                                <img src={image} alt="product image" width={100} height={100} />
                                <p className='bold'>UGX { choice.price }</p>
                            </div>
                            <div className='p6-w flex-center column'>
                                <p className='p10'>{choice.name} { choice.specs }</p>
                                <input id={choice.id} defaultValue={0} onClick={() => { setPriceValue(choice.price) }} onChange={valueChanged} className='b2 b-green solid p10' type="number"/>
                            </div>
                            <div className='flex-center'>
                                <p className='p10 bold upper center'>Amount:</p>
                                <p id={ 'item-'+choice.id } className='p10 bold center'>UGX 0</p>
                            </div>
                        </div>
                    ))
                }

            </section>

            <section className='flex-center column w-full'>
                <div className='flex-center m10 b2 b-green dashed w-half p10 column center w-min300'>
                    <p className='m10 bold f15 upper'>details</p>

                    <section>
                        <p className='m10'>Items: { selections.length}</p>
                        <p className='m10'>grand total: UGX { grandTotal }</p>
                    </section>
                </div>
            </section>

            <section className='flex-center column w-full'>
                <p className='m10 bold f15 upper center'>Request Order</p>

                <form onSubmit={submitOrder} className='w-half b2 b-green dashed p20 w-min300'>
                    <input onChange={handleFormChange} className='w-full p8 f11 b2-b solid b-green' type="text" name='name' placeholder={'Name here'} /> <br />
                    <input onChange={handleFormChange} className='w-full p8 f11 b2-b solid b-green' type="text" name='address' placeholder={'Adress here'} /> <br />
                    <input onChange={handleFormChange} className='w-full p8 f11 b2-b solid b-green' type="text" name='contact' placeholder={'Phone Number here'} /> <br />
                    <button type="submit" className='pointer green-bg white-fg p10 m10 round-s'>Request Order</button>
                </form>
            </section>

        </main>
    )
}
