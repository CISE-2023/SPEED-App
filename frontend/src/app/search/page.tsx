"use client";

import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import style from "../styles/Search.module.css";

export default function SearchPage() {
  const [seSelection, setSESelection] = useState("");
  const [claimSelection, setClaimSelection] = useState("");

  return (
    <div className="page">
      <div className={style.pageContents}>
        <h1 className="heading">SEARCH</h1>
        <p>Select your software engineering method of interest and claim.</p>

        <form>
          {/*SE Method dropdown*/}
          <div className={style.titleContainer}>
            <h2 className={style.subheading}>SE Method</h2>
            <h2 className={style.subheading}>Claim</h2>
          </div>
          <div className={style.dropdownContainer}>
            <Dropdown id={style.dropdown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {seSelection ? seSelection : "Select SE Method"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSESelection("SE Practice 1")}>
                  SE Practice 1
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSESelection("SE Practice 2")}>
                  SE Practice 2
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSESelection("SE Practice 3")}>
                  SE Practice 3
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/*Claim dropdown*/}

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {claimSelection ? claimSelection : "Select Claim"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setClaimSelection("Claim 1")}>
                  Claim 1
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setClaimSelection("Claim 2")}>
                  Claim 2
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setClaimSelection("Claim 3")}>
                  Claim 3
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
