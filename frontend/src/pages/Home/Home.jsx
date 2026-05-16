import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import FindFood from '../../components/FindFood/FindFood'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <FindFood setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default Home
