"use client";

// Packages
import style from "../app/styles/ArticleCard.module.css";
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
        article = ({...article, [e.target.name]: e.target.value.toLowerCase()});
        article = ({...article, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {
        article.seMethod?.toLowerCase(); 
        article.claim?.toLowerCase();
        aSubmit?.(article);
    }

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
            <h2 className="subHeading">DETAILS</h2>
            </div>
        <div className={style.wrapper}>
            <div className={style.columnWrapper}>
                <h2 className={style.subHeading}>Article ID:</h2>
                <p className={style.text}>{article?.id}</p>
                <h2 className={style.subHeading}>Article Title:</h2>
                <p className={style.text}>{article.title}</p>
                <h2 className={style.subHeading}>Source:</h2>
                <p className={style.text}>{article.source}</p>
                <h2 className={style.subHeading}>publication:</h2>
                <p className={style.text}>{article.publication}</p>
            </div>
            <div className={style.columnWrapper}>
                <h2 className={style.subHeading}>Author(s):</h2>
                <p className={style.text}>{article.author}</p>
                {article.volume 
                    ?  <><div><h2 className={style.subHeading}>Volume:</h2> <p className={style.text}>{article.volume}</p></div></> 
                    : null}
                {article.number 
                    ?  <><div><h2 className={style.subHeading}>Number:</h2> <p className={style.text}>{article.number}</p></div></> 
                    : null}
                {article.doi
                    ?  <><div><h2 className={style.subHeading}>DOI:</h2> <p className={style.text}>{article.doi}</p></div></> 
                    : null}
                {article.comments
                    ?  <><div><h2 className={style.subHeading}>Comments:</h2> <p className={style.text}>{article.comments}</p></div></> 
                    :    null}
            </div>
        </div> 
                {moderation ? 
                    <>       
                    <h2 className="subHeading">CRITERIA</h2>
                            <form onSubmit={ () => mSubmit?.(approved, article) }>
                                {critera.map((value, index) => {
                                    return (
                                        <>
                                                <input 
                                                    key={index}
                                                    type="checkbox" 
                                                    id={`criteria-${index}`} 
                                                    name={value} 
                                                    value={value}
                                                    checked={checkedState[index]}
                                                    onChange={() => handleOnChange(index)}
                                                    /> 
                                                <label className={style.text}>&nbsp;{value}</label><br/>
                                        </>
                                    );
                                })}
                                <input type="submit" className={approved === true ? `${style.approve}` : `${style.reject}`} value={approved === true ? "Approve" : "Reject"}/>
                            </form>
                    </>
                : null}             
            
            {analysis ? 
                <>
                    <div className={style.wrapper}>
                        <h2 className="subHeading">FORM</h2>
                    </div>
                        <form id={`analysisForm-${index}`} onSubmit={ handleSubmit }>
                            <div className={style.wrapper}>
                                <div className={style.inputColumnWrapper}>
                                    <div className={style.input}>
                                        <label htmlFor={`method-${index}`}><h2 className={style.subHeading}>SE Method:</h2></label>
                                        <input
                                            type="text"
                                            id={`method-${index}`}
                                            name="seMethod"
                                            required={true}
                                            value={ article.seMethod }
                                            onChange={ onChange }
                                            className={style.textInput}
                                        />
                                    </div>
                                    <div className={style.input}> 
                                        <label htmlFor={`claim-${index}`}><h2 className={style.subHeading}>Claim:</h2></label>
                                        <input
                                            type="text"
                                            id={`claim-${index}`}
                                            name="claim"
                                            required={true}
                                            value={ article.claim }
                                            onChange={ onChange }
                                            className={style.textInput}
                                        />
                                    </div>

                                    <div className={style.input}>
                                        <label htmlFor={`claim-${index}`}><h2 className={style.subHeading}>Evidence:</h2></label>
                                        <input
                                            type="text"
                                            id={`evidence-${index}`}
                                            name="evidence"
                                            required={true}
                                            value={ article.evidence }
                                            onChange={ onChange }
                                            className={style.textInput}
                                        />
                                    </div>
                                </div>
                                <div className={style.inputColumnWrapper}>
                                    <div className={style.input}>
                                        <label htmlFor={`summary-${index}`}><h2 className={style.subHeading}>Summary:</h2></label>
                                        <textarea
                                            id={`summary-${index}`}
                                            rows={5}
                                            name="summary"
                                            required={true}
                                            value={ article.summary }
                                            onChange={ onChange }
                                            className={style.formTextArea}
                                        />
                                    </div>
                                    
                                    <input className="submit" type="submit" value="Submit Article"/>
                                </div>
                            </div>
                        </form>

                        <br/>

                </>
                : null}
        </div>
    )
}

export default ArticleCard;