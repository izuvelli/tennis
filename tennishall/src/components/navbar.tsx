import './navbar.css';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (

<div className="animated-border-box">
<div className="animated-border-box-glow">   
</div> 

   <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="navbar-brand">LkpgsTennisklubb</button>
        </div>

        <div className="navbar-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <li><Link to="/" className='nav-link'>Hem</Link></li>
            </li>
            <li className="nav-item">
              <li><Link to="/Om-Oss" className='nav-link'>Om Oss</Link></li>
            </li>
          </ul>
        </div>
      </div>
    </nav>   

</div>
    
    
  );
};

export default navbar;
