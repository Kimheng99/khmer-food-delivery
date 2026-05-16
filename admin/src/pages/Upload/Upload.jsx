import React from 'react'
import './Upload.css'
import {assets} from '../../assets/assets.js'
import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { StoreContext } from '../../context/StoreContext.jsx'

const Upload = () => {
  
  const [imagePreview, setImagePreview] = useState(null);
  const { BASE_URL } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Fried food",
    price: "",
    image: null
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  }
  const onFileChange = (event) => {
    const file = event.target.files[0];

    setData(prev => ({ ...prev, image: file }));

    // create preview URL
    setImagePreview(URL.createObjectURL(file));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", data.image);

    try {
        const response = await fetch(`${BASE_URL}/food/add`, {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // 🎉 SHOW ALERT HERE
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Food uploaded successfully",
            showConfirmButton: false,
            timer: 1500
          });

          // (optional) reset form
          setData({
            name: "",
            description: "",
            category: "Salad",
            price: "",
            image: null
          });

          setImagePreview(null);

        } else {
          Swal.fire({
            icon: "error",
            title: "Upload failed",
            text: result.message
          });
        }

      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Something went wrong"
        });
      }
      }
  
  useEffect(()=>{

    console.log(data);

  }, [data])

  return (
    <div className='sidebar-content'>
        <form className='upload-form' onSubmit={onSubmitHandler}>

          <label>Upload Image</label>

          <label htmlFor="image" className="box-upload-img">
            <img 
              src={imagePreview ? imagePreview : assets.upload_area} 
              alt="" 
            />
          </label>

          <input 
            id="image"
            type="file" 
            hidden
            onChange={onFileChange} 
          />

          <label>Product Name</label>
          <input 
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder='input name of food' 
            type="text" 
          />

          <label>Product description</label>
          <textarea 
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="6"
          />

          <label>Product Category</label>
          <select 
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option value="Fried food">Fried Food</option>
            <option value="Soup">Soup</option>
            <option value="Drinks">Drinks</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Cake">Cake</option>
          </select>

          <label>Product Price</label>
          <input 
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            type="number" 
          />

          <button type='submit'>Upload</button>
        </form>
    </div>
  )
}

export default Upload
