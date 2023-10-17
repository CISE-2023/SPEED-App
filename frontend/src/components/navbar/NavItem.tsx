"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Nav.module.scss";

type Props = {
    route?: string;
    children: React.ReactNode;
    logo?: boolean;
    onClick?: boolean | (() => void);
    style?: React.CSSProperties;
};

const NavItem = ({ children, route, logo, onClick, style }: Props) => {
    const router = useRouter();

    const navigate: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (typeof route === "string") {
            router.push(route);
        }

        event.stopPropagation();
    };
    return (
        <div
            style={style}
            className={`${route || onClick ? styles.clickable : styles.navitem}${
                logo ? ` ${styles.logo}` : ""}`}
            onClick={typeof onClick === "function" ? onClick : navigate}
        >
            {children}
        </div>
    );
};

export default NavItem;
