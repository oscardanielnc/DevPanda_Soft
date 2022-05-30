import React from "react";
import { Placeholder } from "react-bootstrap";
import loading from "../../assets/gif/loading.gif"
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import LayoutStudent from "../../layouts/LayoutBasic";
import Loading from "./PandaLoading";

import "./scss/PandaLoaderPage.scss"

export default function PandaLoaderPage({type='e'}) {
    if(type !== 'e') {
        return (
            <LayoutAdministrative>
                <Loading/>
            </LayoutAdministrative>
        )
    }
    return ( 
        <LayoutStudent>
            <Loading/>
        </LayoutStudent>
    )
}
