import React from 'react';
import './Hem.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer.tsx';
import pill from '../../assets/down-arrow.gif.4ce2b1f462a2c0e8e702b3b0e2c9c34d.gif';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const Hem: React.FC = () => {
  return (

<div className="hem">


<Navbar />
<div className='main'>

<center>
  <h1>Välkommen till våran klubb</h1>
  <b>Vi erbjuder uthyrning av tre Tennishallar </b>
<img src={pill} alt="loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:"100px", height:"100px",}} />
  
<Button type="primary" style={{  width:"300px", height:"60px",marginTop:"25px"}} ><Link to="/Boka-Hall"> Boka</Link></Button>

</center>

</div >

<Footer/>

</div>
  );
}

export default Hem;
