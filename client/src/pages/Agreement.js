import React from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import './Agreement.scss';
import CompUpload from '../components/Single/CompUpload';

export default function Agreement (){
    return(
        <LayoutBasic>
            <div className="container">                
                <CompUpload/>
            </div>
        </LayoutBasic>
    );
}
