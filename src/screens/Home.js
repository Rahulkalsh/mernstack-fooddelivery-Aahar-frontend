import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'
export default function Home() {
  const [search,setSearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const baseUrl = "https://rahulkalsh-mernstack-food-delivery-aahar.onrender.com"
  // const baseUrl="http://localhost:5000"
  const loadData = async () => {
    let response = await fetch(`${baseUrl}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="https://source.unsplash.com/random/900x300/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://source.unsplash.com/random/900x300/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x300/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div></div>
      <div className='container'>
        {foodCat.length !== 0 ?
          foodCat.map((data) => {
            return (<div className='row mb-3'>
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length !== 0 ?
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filterItems) => {
                  return (<div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card
                      foodItem = {filterItems}
                      options={filterItems.options[0]}
                     
                    >

                    </Card>
                  </div>)
                })
                : <div>No data available</div>
              }
            </div>)
          })
          : <div>No data available</div>
        }
      </div>
      <div><Footer /></div>
    </div>
  );
}  