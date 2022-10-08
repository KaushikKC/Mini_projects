import axios from "axios";
import { useState, useEffect } from 'react';
import React from "react";
import './componentsCss.css'

let string1 = `This is coming from GetSomethingMongo Component`;
let stringloading = `loading........`;
// let stringloaded = `MONGO DB DATA IS HERE FROM AXIOS`;
let listofmovies =`Here is your list of details of amazon in a nice simple list`;
let MongoURI = 'http://localhost:8081/mongodb/amazon'

const AmazonDetails = () => {

    const [post, setPost] = useState(null);

    function AmazonItem(props) {
        // console.log(props);
        const amazonthing = (
            <div>
                
                <h2>Company ID : {props.detail._id}</h2>
                <br></br>
                <img className="w-50 mb-4 rounded" src={props.detail.logo} alt="" />
                <p className="w-50 m-auto">{props.detail.description}</p>
                <br />
                <hr />
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <h3 className="fw-bold fs-2">Founder</h3>
                            <img className="fimg rounded" style={{width:'30%'}} src={props.detail.Founder.url} alt="" />
                            <h4>Name : {props.detail.Founder.name}</h4>
                            <h5>Born : {props.detail.Founder.yearb}</h5>
                            <h5>Studies : {props.detail.Founder.studies}</h5>
                            <h5>Year he Founded : {props.detail.Founder.yearf}</h5>
                        </div>
                        <div class="col">
                            
                            <h3 className="fw-bold fs-2">CEO</h3>
                            <img className="fimg rounded" style={{width:'40%'}} src={props.detail.Ceo.url} alt="" />
                            <h4>Name : {props.detail.Ceo.name}</h4>
                            <h5>Born : {props.detail.Ceo.yearb}</h5>
                            <h5>Studies : {props.detail.Ceo.studies}</h5>
                            <h5>Year he become CEO : {props.detail.Ceo.yearf}</h5>
                
                        </div>
                    </div>
                </div>
                

                {/* <p>rating : {props.movie.imdb.rating}</p>
                <p>votes : {props.movie.imdb.votes}</p>
                <p>id : {props.movie.imdb.id}</p> */}
                {/* <p>hello</p> */}
                <br />
                
            </div>
        );
        return amazonthing;
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
        <AmazonItem key={singlecompanyitem._id} detail={singlecompanyitem} />
                 )}
        
        </div>
    );    
    //if we are here, that means, post has been update
    //and the API call was successfull
    return outputWithNASARESPONSE;        
    }


export default AmazonDetails;