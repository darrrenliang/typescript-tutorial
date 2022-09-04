// import react from "react";
// import { Menubar } from 'primereact/menubar';

export default function HomePage() {
    return (
        <>
            <h1>HomePage</h1>
            <p>{process.env.NODE_ENV}</p>
            <p>{process.env.REACT_APP_NAME}</p>
        </>
    )
};