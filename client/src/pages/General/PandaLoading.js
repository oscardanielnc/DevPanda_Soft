import React from "react";
import { Placeholder } from "react-bootstrap";
import loading from "../../assets/gif/loading.gif"
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import LayoutStudent from "../../layouts/LayoutBasic";

import "./scss/PandaLoaderPage.scss"

export default function Loading(tiny=false) {
    return (
        <div className="container">
            <div className="pandaLoaderPage">
                <div className="pandaLoaderPage__img">
                    <img src={loading}/>
                </div>
                <Placeholder animation="glow" className="pandaLoaderPage__placeholder">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                {
                    !tiny && 
                    <><Placeholder animation="glow" className="pandaLoaderPage__placeholder">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder><Placeholder animation="glow" className="pandaLoaderPage__placeholder">
                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder><Placeholder animation="glow" className="pandaLoaderPage__placeholder">
                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder></>
                }
            </div>
        </div>
    )
}