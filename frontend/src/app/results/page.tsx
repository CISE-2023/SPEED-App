"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Image from 'next/image';

const Page = ({ searchParams, }: { searchParams: { seSelection: string;claimSelection: string; }}) => {

  // interface for articles
  interface Article {
    _id: string;
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

  // visibility states for the table columns
  const [titleVisibility, setTitleVisibility] = useState<boolean>(false);
  const [authorVisibility, setAuthorVisibility] = useState<boolean>(false);
  const [publicationVisibility, setPublicationVisibility] = useState<boolean>(false);
  const [methodVisibility, setMethodVisibility] = useState<boolean>(false);
  const [claimVisibility, setClaimVisibility] = useState<boolean>(false);

  // functions to toggle the visibility of the table columns
  const toggleTitlesVisibility = () => () => {
    setTitleVisibility(!titleVisibility);
  };
  const toggleAuthorsVisibility = () => () => {
    setAuthorVisibility(!authorVisibility);
  };
  const togglePublicationsVisibility = () => () => {
    setPublicationVisibility(!publicationVisibility);
  };
  const toggleMethodsVisibility = () => () => {
    setMethodVisibility(!methodVisibility);
  };
  const toggleClaimsVisibility = () => () => {
    setClaimVisibility(!claimVisibility);
  };


  // function to get the article data from the backend and filter them based on the search parameters
  const getArticleData = () => {
    axios
        .get('http://localhost:3001/analysis')
        .then((response) => {
            // Filter the articles here
            const filteredArticles = response.data.filter((article: Article) => {
              return (
                (!searchParams.claimSelection || article.claim === searchParams.claimSelection) &&
                (!searchParams.seSelection || article.seMethod === searchParams.seSelection)
              );
            });
            setArticles(filteredArticles);
        })
        .catch((error) => {
            console.error('Error retrieving a response from the backend server.');
        });
  }
  
  // get the article data from the backend when the page is loaded
  useEffect(()=>{
    getArticleData();
	}, [])

    return (
      <div className="page">
        <div className="pageContents">
          <h1 className="heading">Search Results</h1>
          <p className="text">The following table contains the results of your search.</p>

          {/* table with clickable images to toggle column tables */}
          <Table>
            <thead>
              <tr>
                <th>
                  <Image 
                  src={titleVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                  onClick={toggleTitlesVisibility()} 
                  alt={''} 
                  width={20} height={20}
                  />
                  Titles
                </th>
                <th>
                  <Image 
                  src={authorVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                   onClick={toggleAuthorsVisibility()} 
                   alt={''}
                   width={20} height={20}
                   />
                  Authors
                </th>
                <th>
                  <Image 
                  src={publicationVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                  onClick={togglePublicationsVisibility()} 
                  alt={''} 
                  width={20} height={20}
                  />
                  Publication Year
                </th>
                <th><Image 
                src={methodVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                onClick={toggleMethodsVisibility()} 
                alt={''} 
                width={20} height={20}
                />
                  SE Methods
                </th>
                <th>
                  <Image 
                  src={claimVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                  onClick={toggleClaimsVisibility()} 
                  alt={''} 
                  width={20} 
                  height={20}/>
                  Claims
                </th>
              </tr>
            </thead>
          </Table>
          <br />

          {/* table with the results */}
          <Table striped bordered>
          <thead>
              <tr>
                <th hidden={titleVisibility}>Title</th>
                <th hidden={authorVisibility}>Author(s)</th>
                <th hidden={publicationVisibility}>Publication Year</th>
                <th hidden={methodVisibility}>SE Method</th>
                <th hidden={claimVisibility}>Claim</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id} className="text">
                  <td hidden={titleVisibility}>{article.title}</td>
                  <td hidden={authorVisibility}>{article.author}</td>
                  <td hidden={publicationVisibility}>{article.publication}</td>
                  <td hidden={methodVisibility}>{article.seMethod}</td>
                  <td hidden={claimVisibility}>{article.claim}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </div>
  )
}

export default Page