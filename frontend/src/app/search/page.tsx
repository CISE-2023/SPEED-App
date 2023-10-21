"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import style from "../styles/Search.module.css";
import "../styles/globals.scss";
import axios from 'axios';

export default function SearchPage() {
    // interface for articles
    interface Article {
        id: string;
        title: string;
        source: string;
        publication: number;
        author: string;
        volume: string;
        number: number;
        doi: string;
        comments: string;
        summary: string;
        seMethod: string;
        claim: string;
        evidence: string;
    }

    const [articles, setArticles] = useState<Article[]>([]);
    const [methods, setMethods] = useState<string[]>([]);
    const [claims, setClaims] = useState<string[]>([]);
    const [seSelection, setSESelection] = useState("");
    const [claimSelection, setClaimSelection] = useState("");

    // function to get the article data from the backend and filter them based on the search parameters
    const getArticleData = () => {
        axios
            .get('http://localhost:3001/analysis')
            .then((response) => {
            const articlesData = response.data;
      
            // Extract unique seMethods
            const uniqueMethods = Array.from(new Set(articlesData.map((article: Article) => article.seMethod)));
      
            // Update the methods state
            setMethods(uniqueMethods as string[]);
      
            // Update the articles state with all articles
            setArticles(articlesData);

            console.log(methods);
          })
          .catch((error) => {
            console.error('Error retrieving a response from the backend server.'); 
          });
      };

      // when page loads, get the article data from the backend and store the unique seMethods in the methods state
      useEffect(()=>{
        getArticleData();
        }, []);

        // Update the claims state when the seSelection changes
        useEffect(() => {
            if (seSelection) {
                const claimsForSelectedMethod = articles
                    .filter((article) => article.seMethod === seSelection)
                    .map((article) => article.claim);
    
                // Get unique claims
                const uniqueClaims = Array.from(new Set(claimsForSelectedMethod));
                setClaims(uniqueClaims as string[]);
                console.log(claims);
            } else {
                setClaims([]); // Reset claims if no SE method selected
            }
        }, [seSelection, articles]);

    // function to check wether the claim dropdown should be disabled or not
    const check = () => {
        if (seSelection === "") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="page">
            <div className="pageContents">
            <h1 className="heading">SEARCH</h1>
            <p className="text">Select your software engineering method of interest and claim.</p>
            
            {/*SE Method dropdown*/}
            <form className="pageContents">
                <div className={style.wrapper}>
                    <div className={style.methodWrapper}>
                        <h2 className={style.subHeading}>SE Method</h2>
                        <div style={{marginRight: "3vw"}}></div>
                        <Dropdown id="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdownMenu">
                                { seSelection ? seSelection : "Select SE Method"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {setSESelection(""), setClaimSelection("")}}>All SE Methods</Dropdown.Item>
                                 {methods.map((method) => (
                                    <Dropdown.Item key={method} onClick={() => setSESelection(method)}>{method}</Dropdown.Item>
                                    ))}
                         </Dropdown.Menu>
                        </Dropdown>  
                    </div>
                
                    <div className={style.blueLine}/>
                    {/*Claim dropdown*/}
                    <div className={style.claimWrapper}>
                        <h2 className={style.subHeading} style={{marginLeft: "2.5vw"}}>Claim</h2>
                        <div style={{marginLeft: "1,5vw"}}>
                            <Dropdown id="dropdown">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdownMenu" disabled={check()}>
                                    { claimSelection ? claimSelection : "Select Claim"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setClaimSelection("")}>All Claims</Dropdown.Item>
                                        {claims.map((claim) => (
                                        <Dropdown.Item key={claim} onClick={() => setClaimSelection(claim)}>{claim}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                            </Dropdown> 
                        </div>
                    </div>
                </div>
                <Link href={{pathname: "/results",query: { seSelection, claimSelection },}}>
                <input className="submit" type="submit" />
                </Link>
            </form>    
            </div>
        </div>
    );
}
