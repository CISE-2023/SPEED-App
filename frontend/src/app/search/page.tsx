"use client";

import Link from "next/link";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

export default function SearchPage() {
    const [seSelection, setSESelection] = useState("");
    const [claimSelection, setClaimSelection] = useState("");

    return (
        <div>
            <h1>SEARCH</h1>
            <p>Select your software engineering method of interest and claim.</p>
            
            <form>
            {/*SE Method dropdown*/}
            <h2>SE Method</h2>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    { seSelection ? seSelection : "Select SE Method"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSESelection("tdd")}>TDD</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSESelection("mob programming")}>Mob Programming</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>  
            <br />
            {/*Claim dropdown*/}
            <h2>Claim</h2>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    { claimSelection ? claimSelection : "Select Claim"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setClaimSelection("against")}>Against</Dropdown.Item>
                    <Dropdown.Item onClick={() => setClaimSelection("for")}>For</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
                <Link href={{pathname: "/SearchResults",query: { seSelection, claimSelection },}}>
                    <input type="submit" />
                </Link>
            </form>    
        </div>
    );
}