import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({category}) => {
  return (
     <Link
            to={`/categories/${category.id}`}
            className="category-card"
          >
            <img
              src={`https://exam-server-5c4e.onrender.com${category.image}`}
              alt={category.title}
              className="category-card__image"
            />
            <div className="category-card__label">{category.title}</div>
          </Link>
  )
}

export default CategoryCard