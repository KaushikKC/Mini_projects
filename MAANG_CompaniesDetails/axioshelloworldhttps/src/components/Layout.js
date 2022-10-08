import { Outlet, Link } from "react-router-dom";

const Layout = () => (
    <div className="text-center my-5">
        <Outlet />       
        <hr></hr>
        <nav>
            <p>
            {/* <Link to="/">Home</Link> */}
            <Link class="btn btn-outline-dark m-2" to="/meta">Meta</Link> | 
            <Link class="btn btn-outline-dark m-2" to="/apple">Apple</Link> |
            <Link class="btn btn-outline-dark m-2" to="/amazon">Amazon</Link> | 
            <Link class="btn btn-outline-dark m-2" to="/netflix">Netflix</Link> |
            <Link class="btn btn-outline-dark m-2" to="/google">Google</Link> 
            {/* <Link to="/nothing-here">Nothing Here</Link> |
            <Link to="/about">About</Link> */}
            </p>
        </nav> 
        {/* <hr></hr> */}
        
  </div>
);

export default Layout;