"use client";

import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import style from "../styles/Search.module.css";
//import Button from "../../components/Button";
import "../styles/globals.scss";

export default function SearchPage() {
  const [seSelection, setSESelection] = useState("");
  const [claimSelection, setClaimSelection] = useState("");

  return (
    <div className="page">
      <div className="pageContents">
        <h1 className="heading">SEARCH</h1>
        <p>Select your software engineering method of interest and claim.</p>

        <form className="pageContents">
          <div className={style.wrapper}>
            <div className={style.methodWrapper}>
              <h2 className={style.subheading}>SE Method</h2>
              <div style={{ marginRight: "3vw" }}>
                <Dropdown id="dropdown">
                  <Dropdown.Toggle
                    className="dropdownMenu"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {seSelection ? seSelection : "Select SE Method"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setSESelection("SE Practice 1")}
                    >
                      SE Practice 1
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSESelection("SE Practice 2")}
                    >
                      SE Practice 2
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSESelection("SE Practice 3")}
                    >
                      SE Practice 3
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={style.blueLine} />
            <div className={style.claimWrapper}>
              <h2 className={style.subheading} style={{marginLeft: "2.5vw"}}>Claim</h2>
              <div style={{ marginLeft: "1.5vw" }}>
                <Dropdown id="dropdown">
                  <Dropdown.Toggle 
                    variant="success" 
                    id="dropdown-basic"
                    className="dropdownMenu">
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
            </div>
          </div>
          <input
            className="submit"
            type="submit"
            value="Search Article"
          />
        </form>
      </div>
    </div>
  );
}
