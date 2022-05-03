import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form} from 'react-bootstrap';
import './RevisionConveniosCoordEsp.scss';
import Upload from '../components/Single/Upload';

export default function RevisionConveniosCoordEsp (){
    return(
        <LayoutBasic>
            <div className="container">
                <Upload/>
            </div>
        </LayoutBasic>
    );
}
