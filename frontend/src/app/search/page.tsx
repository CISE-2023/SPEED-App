"use client";

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
                    <Dropdown.Item onClick={() => setSESelection("SE Practice 1")}>SE Practice 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSESelection("SE Practice 2")}>SE Practice 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSESelection("SE Practice 3")}>SE Practice 3</Dropdown.Item>
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
                    <Dropdown.Item onClick={() => setClaimSelection("Claim 1")}>Claim 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => setClaimSelection("Claim 2")}>Claim 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => setClaimSelection("Claim 3")}>Claim 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
            <input type="submit" />
            </form>    
        </div>
        
    );
}