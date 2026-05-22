import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const FoodDisplay = ({category}) => {
    useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
    });
  }, []);
    
    const {food_list} = useContext(StoreContext)


  return (
    <div className='food-display'>
        <h1>Food that you love</h1>
        <div data-aos="zoom-in-down" className="food-display-list">
            {food_list.map((item,index)=>{
                console.log(category,item.category)
                if(category==="All" || category === item.category){
                    return <FoodItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description} />
                }
                return null;
                
            })}
        </div>
      
    </div>
  )
}

export default FoodDisplay
