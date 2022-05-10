import React  from "react";

import './StateViewer.scss';

const SuccessImage = "./StateViewerImages/success.png"
const FileEmptyImage = "./StateViewerImages/fileEmpty.png"
const PendingImage = "./StateViewerImages/pending.png"
const ErrorImage = "./StateViewerImages/error.png"
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
    static error( title, description){
        return  new StatesViewType(title, ErrorImage, description)
    }
}

export default function StateViewer ({states}) {
    return (
        <div className="container gx-0 statesContainer">
            <div className="row center gx-0">
            {
            states.map((states, index) => (
                <div key={index} className="col-6 col-lg-4 box">
                    <h5 className="title" style={{marginBottom:"10px"}}>{states.title}</h5>
                    <img className="image" alt="Imagen" src={states.image}></img>
                    <p className="description" style={{marginTop:"10px"}}>{states.description}</p>
                </div>
            ))
            }
            </div>
        </div>
    )
}