import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './List.css'
import Swal from "sweetalert2"
import { StoreContext } from '../../context/StoreContext'



const List = () => {
  const [foods, setFoods] = useState([])
  const { BASE_URL } = useContext(StoreContext);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/food/list`)
      if (res.data.success) {
        setFoods(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Delete this food?",
    icon: "warning",
    showCancelButton: true,
  })

  if (result.isConfirmed) {
    const res = await axios.post(`${BASE_URL}/api/food/remove`, { id })

    if (res.data.success) {
      Swal.fire("Deleted!", "", "success")
      fetchFoods()
    }
  }
}

  useEffect(() => {
    fetchFoods()
  }, [])

  return (
    <div className='sidebar-content'>
      <h1>Food List</h1>

      <div className="list-table">

        <div className="list-header">
          <p>Image</p>
          <p>Name</p>
          <p>Price</p>
          <p>Category</p>
          <p>Action</p>
        </div>

        {foods.map((item) => (
          <div className="list-row" key={item._id}>
            
            {/* FIXED IMAGE */}
            <img 
              src={item.image} 
              alt={item.name} 
            />

            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{item.category}</p>

            {/* DELETE BUTTON */}
            <button onClick={() => handleDelete(item._id)}>
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}

export default List