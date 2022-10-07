import axios from "axios";
import { useState, useEffect } from 'react';
import React from "react";

let string1 = `This is coming from GetSomethingMongo Component`;
let stringloading = `loading........`;
let stringloaded = `MONGO DB DATA IS HERE FROM AXIOS`;
let listofmovies =`Here is your list of details of google in a nice simple list`;
let MongoURI = 'http://localhost:8081/mongodb/google'

const GoogleDetails = () => {

    const [post, setPost] = useState(null);

    function GoogleItem(props) {
        // console.log(props);
        const googlething = (
            <div>
                <h2>Company ID : {props.detail._id}</h2>
                <br></br>
                <img className="w-50" src={props.detail.logo} alt="" />
                <p>{props.detail.description}</p>
                <br />
                <h3>Founder</h3>
                <img src={props.detail.Founder.url} alt="" />
                <h4>Name : {props.detail.Founder.name}</h4>
                <h4>Born : {props.detail.Founder.yearb}</h4>
                <h4>Year they Founded : {props.detail.Founder.yearf}</h4>

                {/* <p>rating : {props.movie.imdb.rating}</p>
                <p>votes : {props.movie.imdb.votes}</p>
                <p>id : {props.movie.imdb.id}</p> */}
                {/* <p>hello</p> */}
                <br />
                <h3>CEO</h3>
                <img src={props.detail.Ceo.url} alt="" />
                <h4>Name : {props.detail.Ceo.name}</h4>
                <h4>Born : {props.detail.Ceo.yearb}</h4>
                <h4>Year he become CEO : {props.detail.Ceo.yearf}</h4>
                <hr />
            </div>
        );
        return googlething;
    }

    useEffect ( () => {
        //call NASA API the moment page loads. 
        axios.get(MongoURI).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
                // console.log(post.movies)
            }
        );
    },[]);

    const outputWhenNull = 
    (
        
        <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        <h1 className="mb-4">{string1}</h1> 
        <h1 className="mb-4">{stringloading}</h1>   
        {/* <img src={localAntEaterImage} className="img-fluid" alt="..."></img> */}
        </div>
    );

    if(!post) 
    {
        return outputWhenNull;
    }
    const outputWithNASARESPONSE = 
    (
        
        <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        {/* <h1 className="mb-4">{string1}</h1> 
        <h1 className="mb-4">{stringloaded}</h1>    */}
        {/* <img src={post.hdurl} className="img-fluid" alt="..."></img>
        <h6 className="mb-4">{post.explanation}</h6> */}
        <h6 className="mb-4">{listofmovies}</h6>
        {post.details.map( (singlecompanyitem) => 
        <GoogleItem key={singlecompanyitem._id} detail={singlecompanyitem} />
                 )}
        
        </div>
    );    
    //if we are here, that means, post has been update
    //and the API call was successfull
    return outputWithNASARESPONSE;        
    }


export default GoogleDetails;