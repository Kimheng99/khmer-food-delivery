import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    
    
    const [cartItem, setCartItem] = useState({})
    const [food_list, setFoodList] = useState([]);
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';


    useEffect(() => {
    const fetchFoodList = async () => {
        try {
            const res = await fetch(`${BASE_URL}/food/list`);
            const data = await res.json();

            if (data.success) {
                setFoodList(data.data);
            }
        } catch (error) {
            console.log("Error fetching food:", error);
        }
    };

    fetchFoodList();
    
}, [BASE_URL]);

    const addCart = (idItem)=>{
         setCartItem((prev)=>({
            ...prev,[idItem]:prev[idItem]?prev[idItem]+1:1
         }))
    }

    const removeCart = (idItem)=>{
        setCartItem((prev)=>{
            const updated = {...prev}
            if(updated[idItem]===1){
                delete updated[idItem]
            }
            else{
                updated[idItem] -= 1
            }
            return updated
        })
    }

    const calTotalAmount = () => {
        let totalAmount = 0;

        for (const item in cartItem) {
            const product = food_list.find(p => p._id === item);

            if (product) {
                totalAmount += product.price * cartItem[item];
            }
        }

        return totalAmount;
    };

    const [token, setToken] = useState("");
    
    
    const contextValue = {
       food_list,
       setFoodList,
       cartItem,
       setCartItem,
       addCart,
       removeCart,
       calTotalAmount,
       token,
       setToken,
       BASE_URL
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider