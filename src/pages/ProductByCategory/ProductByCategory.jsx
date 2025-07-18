import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'

const ProductByCategory = () => {
    const {id} = useParams()
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchDataById = async () => {
            let res = await fetch(`https://exam-server-5c4e.onrender.com/categories/${id}`)

            let data = await res.json();

            setProducts(data.data)
        }

        fetchDataById()
    },[id])
  return (
  <div>
    {products && products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)
}

export default ProductByCategory;
