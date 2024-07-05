//sortcut rfc for this
import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import img1 from './burger.avif'
import img2 from './pastry.jpg'
import img3 from './barbeque.avif'

export default function Home() {
    const [search,setSearch]=useState('');
    const [foodCat,setFoodCat]=useState([]);
    const [foodItem,setFoodItem]=useState([]);

    const loadData=async()=>{
        let response=await fetch("http://localhost:5000/api/foodData",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            }
        });
        response=await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(()=>{
        loadData()
    },[])


    return (
        <div>
            <div> <Navbar /> </div>
            {/*carousel*/}
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner"  id="carousel">
                    {/*carousel caption obtained and bootstrap obtained from navbar and carousel of bootstrap respectively*/}
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" vaalue={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" style={{filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100" style={{filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100" style={{filter: "brightness(50%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> </div>
            <div className='container'>
                {
                    foodCat.length > 0
                    ? foodCat.map((data)=>{
                        return(<div className='row mb-3'>
                           <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                           <hr/>
                           {foodItem.length > 0?
                           foodItem.filter((item)=>item.CategoryName===data.CategoryName &&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filterItems)=>{
                            return(
                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                    <Card foodItem={filterItems}
                                        options={filterItems.options[0]}
                                        
                                    ></Card>
                                </div>
                            )
                           })
                           :<div>No Such Data Found</div>}
                           </div>
                        )
                        
                    })
                    :<div>""</div>
                }
            </div>

            <div> <Footer /> </div>
        </div>
    )
}