import React from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import './RevisionConveniosCoordEsp.scss';
import CompUpload from '../components/Single/CompUpload';

export default function RevisionConveniosCoordEsp (){
    return(
        <LayoutBasic>
            <div className="container">                
                <CompUpload/>
            </div>
        </LayoutBasic>
    );
}
