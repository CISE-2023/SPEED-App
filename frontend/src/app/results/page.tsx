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
  // state for the articles
  const [articles, setArticles] = useState<Article[]>([]);
  
  // state for the sort order of the table
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  
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

  // function to toggle the sort order of the table
  const toggleSortOrder = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
    console.log(sortOrder);
  };

  // function to sort the articles based on the sort order
  const sortArticles = (articles: Article[]): Article[] => {
    if (sortOrder) {
      return [...articles].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.publication - b.publication;
        } else {
          return b.publication - a.publication;
        }
      });
    }
    return articles;
  };

  // function to get the article data from the backend
  const getArticleData = () => {
    axios
      .get('http://localhost:3001/analysis')
      .then((response) => {
        const filteredArticles = response.data.filter((article: Article) => {
          return (
            (!searchParams.claimSelection || article.claim === searchParams.claimSelection) &&
            (!searchParams.seSelection || article.seMethod === searchParams.seSelection)
          );
        });

        if (sortOrder) {
          const sorted = [...filteredArticles].sort((a, b) => {
            if (sortOrder === 'asc') {
              return a.publication - b.publication;
            } else {
              return b.publication - a.publication;
            }
          });
          setArticles(sorted);
        } else {
          setArticles(filteredArticles);
        }
      })
      .catch((error) => {
        console.error('Error retrieving a response from the backend server.');
      });
  };
  
  // get the article data from the backend when the page is loaded and do get it again when the sort order changes
  useEffect(()=>{
    getArticleData();
	}, [sortOrder])

    return (
      <div className="page">
        <div className="pageContents">
          <h1 className="heading">Search Results</h1>
          <p className="text">The following table contains the results of your search.</p>

          {/* table with clickable images to toggle column tables */}
          <Table>
            <thead>
              <tr>
                <td>
                  <Image 
                  src={titleVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                  onClick={toggleTitlesVisibility()}
                  role="button" 
                  alt={''} 
                  width={20} height={20}
                  />
                  Titles
                </td>
                <td>
                  <Image 
                  src={authorVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                   onClick={toggleAuthorsVisibility()}
                   role="button" 
                   alt={''}
                   width={20} height={20}
                   />
                  Authors
                </td>
                <td>
                  <Image 
                  src={publicationVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                  onClick={togglePublicationsVisibility()} 
                  role="button"
                  alt={''} 
                  width={20} height={20}
                  />
                  Publication Year
                </td>
                <td><Image 
                src={methodVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                onClick={toggleMethodsVisibility()} 
                role="button"
                alt={''} 
                width={20} height={20}
                />
                  SE Methods
                </td>
                <td>
                  <Image 
                  src={claimVisibility ? '/mini-arrow-down-svgrepo-com.svg' : '/cross-small-svgrepo-com.svg'}
                  onClick={toggleClaimsVisibility()} 
                  role="button"
                  alt={''} 
                  width={20} 
                  height={20}/>
                  Claims
                </td>
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
                <th hidden={publicationVisibility}>Publication Year
                <Image src="/mini-arrow-double-svgrepo-com.svg"
                  onClick={toggleSortOrder} 
                  role="button"
                  alt={''} 
                  width={20} 
                  height={20}/>
                  </th>
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