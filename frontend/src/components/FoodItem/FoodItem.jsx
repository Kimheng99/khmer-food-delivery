import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,image,price,description}) => {
    
    const {cartItem, addCart, removeCart} = useContext(StoreContext)

  return (
    <div className='food-item-container'>
        <div className="image-item">
            <img 
                className='food-image' 
                src={image} 
                alt={name}
              />
            {!cartItem[id]
              ?<img className='add-item' src={assets.add_icon_white} onClick={()=>addCart(id)} ></img>
              :<div className='add-remove-item'>
                <img src={assets.remove_icon_red} onClick={()=>removeCart(id)} alt="" />
                <p>{cartItem[id]}</p>
                <img src={assets.add_icon_green} onClick={()=>addCart(id)} alt="" />

              </div>
            }
        </div>
        
        <div className="food-item-infor">
             <div className="name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
             </div>
             
             <p className='item-des'>{description}</p>
             <p className='item-price'>${price}</p>
        </div>
        
      
    </div>
  )
}

export default FoodItem
