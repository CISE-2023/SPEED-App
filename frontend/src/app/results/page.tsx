"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = ({ searchParams, }: { searchParams: { seSelection: string;claimSelection: string; }}) => {

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
      <div>
      {articles.map((article) => (
        <div key={article.id} className='text-white'>
        <h4>Title: {article.title}</h4>
        <p>Claim: {article.claim}</p>
        <p>SE Method: {article.seMethod}</p>
        <p>Publication Year: {article.publication}</p>
        <p>Author(s): {article.author}</p>
      </div>
      ))}
    </div>
  )
}

export default Page