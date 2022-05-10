import React from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import './Agreement.scss';
import FileManagement from '../components/FileManagement/FileManagement';

export default function Agreement (){
    return(
        <LayoutBasic>
            <div className="container">                
                <FileManagement/>
            </div>
        </LayoutBasic>
    );
}
