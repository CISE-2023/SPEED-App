"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { ARTICLES } from '../../../testdata';

const Page = ({ searchParams, }: { searchParams: { seSelection: string;claimSelection: string; }}) => {

  const [art, setArt] = useState(ARTICLES);

  useEffect(()=>{
    if(searchParams.claimSelection && searchParams.seSelection) {
      setArt(art.filter((article) => article.practice === searchParams.seSelection && article.claim === searchParams.claimSelection));
    } else if (searchParams.claimSelection) {
        setArt(art.filter((article) => article.claim === searchParams.claimSelection));
    } else if (searchParams.seSelection) {
        setArt(art.filter((article) => article.practice === searchParams.seSelection));
      } 
	}, [])
  
    return (
      <div>
      {art.map((article) => (
        <div key={article.id}>
        <h4>Title: {article.title}</h4>
        <p>Claim: {article.claim}</p>
        <p>SE Method: {article.practice}</p>
        <p>Publication Year: {article.publication}</p>
        <p>Author(s): {article.author}</p>
      </div>
      ))}
    </div>
  )
}

export default Page