import React from 'react'
import './FindFood.css'
import { menu_list } from '../../assets/assets'

const FindFood = ({category,setCategory}) => {
  return (
    <div className='findFood' id='findFood'>
      <h1>Your Favorite Food, One Click Away</h1>
      <p>We bring your favorite food closer to you. Our menu offers a delicious selection of dishes prepared with care, quality ingredients, and rich flavors. Explore our menu, find what you love, and enjoy every bite from the comfort of your home.</p>
      <div className="findFood-list-container">
        {menu_list.map((item,index)=>{
           return (
             <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="findFood-list">
                  <div  className="box-img">
                    <img className={category===item.menu_name?"active":""}  src={item.menu_image} alt="" />
                  </div>
                  <p>{item.menu_name}</p>
                  
                  
             </div>
           )
        })}
      </div>
      
    </div>
  )
}

export default FindFood
