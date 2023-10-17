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
        summary?: string;
        seMethod?: string;
        claim?: string;
        evidence?: string;
    };    
    index: number;

    moderation?: boolean;
    mSubmit?: (status: boolean, article: any) => void;

    analysis?: boolean;
    aSubmit?: (article: any) => void;
};

const ArticleCard = ({article, index, moderation, analysis, mSubmit, aSubmit}: Props) => {
    /* MODERATION */

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

    /* ANALYSIS */

    const onChange = (e: React.ChangeEvent<any>) => {
        article = ({...article, [e.target.name]: e.target.value});
    }

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
                    <form onSubmit={ () => mSubmit?.(approved, article) }>
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

                        <br/>

                        <input type="submit" value={approved === true ? "Approve" : "Reject"}/>
                    </form>

                    {/*<br/>

                    <button
                        onClick={() => { mSubmit?.(approved, article), resetCheckboxes() }}
                    >{approved === true ? "Approve" : "Reject"}</button>*/}
                </>
                : null}
            
            {analysis ? 
                <>
                    <form id={`analysisForm-${index}`} onSubmit={ () => aSubmit?.(article) }>
                        <label htmlFor={`summary-${index}`}><strong>Summary</strong></label><br/>
                        <input
                            type="text"
                            id={`summary-${index}`}
                            name="summary"
                            required={true}
                            value={ article.summary }
                            onChange={ onChange }
                        />

                        <br/><br/>

                        <label htmlFor={`method-${index}`}><strong>SE Method</strong></label><br/>
                        <input
                            type="text"
                            id={`method-${index}`}
                            name="seMethod"
                            required={true}
                            value={ article.seMethod }
                            onChange={ onChange }
                        />

                        <br/><br/>

                        <label htmlFor={`claim-${index}`}><strong>Claim</strong></label><br/>
                        <input
                            type="text"
                            id={`claim-${index}`}
                            name="claim"
                            required={true}
                            value={ article.claim }
                            onChange={ onChange }
                        />

                        <br/><br/>

                        <label htmlFor={`claim-${index}`}><strong>Evidence</strong></label><br/>
                        <input
                            type="text"
                            id={`evidence-${index}`}
                            name="evidence"
                            required={true}
                            value={ article.evidence }
                            onChange={ onChange }
                        />

                        <br/><br/>
 
                        <input type="submit" value="Submit Article"/>
                    </form>
                </>
                : null}
            <br/><br/><br/>
        </div>
    )
}

export default ArticleCard;