import React  from "react";
import './StateViewer.scss';
import successImg from "../../assets/png/success.png";
import fileEmptyImg from "../../assets/png/fileEmpty.png";
import pendingImg from "../../assets/png/pending.png";
import warningImg from "../../assets/png/warning.png";
import errorImg from "../../assets/png/error.png";

export class StatesViewType {
    constructor (title, image, description) {
    this.title = title;
    this.image = image;
    this.description = description;
    }

    static success( title, description){
        return  new StatesViewType(title, successImg, description)
    }
    static fileEmpty( title, description){
        return  new StatesViewType(title, fileEmptyImg, description)
    }
    static pending( title, description){
        return  new StatesViewType(title, pendingImg, description)
    }
    static warning( title, description){
        return  new StatesViewType(title, warningImg, description)
    }
    static error( title, description){
        return  new StatesViewType(title, errorImg, description)
    }
} 

export default function StateViewer ({states}) {
    return (
        <div className="container gx-0 statesContainer">
            <div className="row center gx-0">
            {
            states.map((state, index) => {
                return (
                <div key={index} className="col-6 col-lg-4 box">
                    <h5 className="title" style={{marginBottom:"10px"}}>{state.title}</h5>
                    <img className="image" alt="Imagen" src={state.image}></img>
                    <p className="description" style={{marginTop:"10px"}}>{state.description}</p>
                </div>
            )})
            }
            </div>
        </div>
    )
}