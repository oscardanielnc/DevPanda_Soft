import React  from "react";

import './StateViewer.scss';

const SuccessImage = "./StateViewerImages/success.png"
const FileEmptyImage = "./StateViewerImages/fileEmpty.png"
const PendingImage = "./StateViewerImages/pending.png"
const WarningImage = "./StateViewerImages/warning.png"

export class StatesViewType {
    constructor (title, image, description) {
    this.title = title;
    this.image = image;
    this.description = description;
    }

    static success( title, description){
        return  new StatesViewType(title, SuccessImage, description)
    }
    static fileEmpty( title, description){
        return  new StatesViewType(title, FileEmptyImage, description)
    }
    static pending( title, description){
        return  new StatesViewType(title, PendingImage, description)
    }
    static warning( title, description){
        return  new StatesViewType(title, WarningImage, description)
    }
}

export default function StateViewer ({states}) {
    return (
        <div className="container gx-0 statesContainer">
            <div className="row center gx-0">
            {
            states.map((states, index) => (
                <div className="col-6 col-lg-4 box">
                    <h5 className="title">{states.title}</h5>
                    <img className="image" src={states.image}></img>
                    <p className="description">{states.description}</p>
                </div>
            ))
            }
            </div>
        </div>
    )
}