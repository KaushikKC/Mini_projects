import './App.css';
import { Routes, Route } from "react-router-dom";

//enguerrand-blanchy-3oADW0Ptj8c-unsplash
// import GetSomething from './components/GetSomething';
// import GetSomethingWithButton from './components/GetSomethingWithButton';
// import PostSomethingMongo from './components/PostSomethingMongo';
// import localImageDiamondMoon from "./images/enguerrand-blanchy-3oADW0Ptj8c-unsplash.jpg";
// import GetSomethingMongo from "./components/GetSomethingMongo";
import GoogleDetails from './components/GoogleDetails';
import AppleDetails from './components/AppleDetails';
import Home from './components/Home';
import Layout from './components/Layout';
import AmazonDetails from './components/AmazonDetails';
import NetflixDetails from './components/NetflixDetails';
import MetaDetails from './components/MetaDetails';
// let string1 = `this is coming from App JS`;



function App() {
  return (
    <div className="App">
      {/* <div className="text-center hero my-5">
        <GoogleDetails />
      </div> */}
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="google" element={<GoogleDetails />} />
          <Route path="apple" element={<AppleDetails />} />
          <Route path="amazon" element={<AmazonDetails />} />
          <Route path="netflix" element={<NetflixDetails />} />
          <Route path="meta" element={<MetaDetails />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
      {/* <div className="text-center hero my-5">
        <GetSomething />
      </div>
      <div className="text-center hero my-5">
        <GetSomethingWithButton />
      </div>   
      <div className="text-center hero my-5">
        <GetSomethingMongo />
      </div>    
      <div className="text-center hero my-5">
        <PostSomethingMongo />
      </div>             
      <div className="text-center hero my-5"> */}
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        {/* <h1 className="mb-4">{string1}</h1>   
        <hr></hr>
        <div className='container-fluid'>
          <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>  
        </div> */}
      {/* </div>        */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
