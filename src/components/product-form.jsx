import { useState } from "react"
import axios from "axios"

export const ProductForm = () => {

    const [name, setName] = useState('')
    const [specs, setSpecs] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('specs', specs)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('image', image)
        console.log(name)
        console.log(specs)
        console.log(category)
        console.log(price)


        const response = await axios.post('http://127.0.0.1:8000/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(response.data)
        setName('')
        setSpecs('')
        setCategory('')
        setPrice('')
        setImage(null)
        document.querySelectorAll('input').forEach((element) => {
            element.value = ''
            if (element.type === 'radio') {
                element.checked = false
            }
        })
    }


    
    return (
        <form onSubmit={handleSubmit} className="w-half w-min300 p20 m30-h b2 b-green dashed">
            <p className="center f13 bold upper m10">Add new product</p>
            <input onChange={(e)=>{setName(e.target.value)}}  type="text" name="name" placeholder="Enter product name" className="p8 f11 b2-b b-green solid" /> <br />
            <input onChange={(e)=>{setCategory(e.target.value)}} type="radio" value={'water'} name="category" id="water"/> <label htmlFor="water">water</label>
            <input onChange={(e)=>{setCategory(e.target.value)}} type="radio" value={'soda'} name="category" id="soda" /> <label htmlFor="soda">soda</label>
            <input onChange={(e)=>{setCategory(e.target.value)}} type="radio" value={'other'} name="category" id="other"/> <label htmlFor="other">other</label> <br />
            <input onChange={(e)=>{setSpecs(e.target.value)}} type="text" name="specs" placeholder="Enter product specs" className="p8 f11 b2-b b-green solid" /><br />
            <input onChange={(e)=>{setPrice(e.target.value)}} type="text" name="price" placeholder="Enter product price" className="p8 f11 b2-b b-green solid" /><br />
            <label htmlFor="product_image"> Choose Product Image</label> <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" name="image" id="product_image" placeholder="Choose file" className="w-max300 p8 f8 b2-b b-green solid"/> <br />
            <button type="submit" className="p8 f11 green-bg white-fg round-s w-full m10">Save</button>
        </form>
    )
}