"use client";

// Packages
import React, { useEffect, useState } from 'react';

type Props = {
    article: {
        id: string;
        title: string;
        source: string;
        publication: number;
        author: string;
        volume: string;
        number: number;
        doi: string;
        comments: string;
    };
    moderation?: boolean;
    analysis?: boolean;
    modButton?: (status: boolean, article: any) => void;
};

const ArticleCard = ({article, moderation, analysis, modButton}: Props) => {
    const critera = [
        "Not a Duplicate",
        "Not Previously Rejected",
        "Relevant to SE",
        "Reputable Source"
    ]

    const [checkedState, setCheckedState] = useState(
        new Array(critera.length).fill(false)        
    );    

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((value, index) =>
            index === position ? !value : value
        );

        setCheckedState(updatedCheckedState);
    }    

    const resetCheckboxes = () => {
        setCheckedState(new Array(critera.length).fill(false));
    }

    const [approved, setApproved] = useState(false);

    useEffect(() => {
        setApproved(checkedState.every(value => value === true));
    }, [checkedState]);   
    
    return (
        <div>
            <strong>Article ID:</strong> {article?.id} <br/>
            <strong>Article Title:</strong> {article.title} <br/>
            <strong>Source:</strong> {article.source} <br/>
            <strong>publication:</strong> {article.publication} <br/>
            <strong>Author(s):</strong> {article.author} <br/>
            {article.volume 
                ?  <><strong>Volume:</strong> {article.volume} <br/></> 
                : null}
            {article.number 
                ?  <><strong>Number:</strong> {article.number} <br/></> 
                : null}
            {article.doi
                ?  <><strong>DOI:</strong> {article.doi} <br/></> 
                : null}
            {article.comments
                ?  <><strong>Comments:</strong> {article.comments} <br/></> 
                : null}

            <br/>

            {moderation ? 
                <>
                    <div>
                        {critera.map((value, index) => {
                            return (
                                <>
                                    <input 
                                        type="checkbox" 
                                        id={`criteria-${index}`} 
                                        name={value} 
                                        value={value}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    /> 
                                    <label>&nbsp;{value}</label><br/>
                                </>
                            );
                        })}
                    </div>

                    <br/>
                        <button
                            onClick={() => { modButton?.(approved, article), resetCheckboxes() }}
                        >{approved === true ? "Approve" : "Reject"}</button>
                </>
                : null}
            {analysis 
                ? <><strong>This is the analysis page</strong><br/><br/></>
                : null}
            <br/><br/><br/>
        </div>
    )
}

export default ArticleCard;