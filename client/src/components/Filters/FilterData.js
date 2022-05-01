import React from "react";
import { FormControl } from "react-bootstrap";

export default function FilterData({originalData, setFilteredData, placeholder, fnGetvalue}) {
    const filter = e => {
        const text = e.target.value.toUpperCase();
        setFilteredData(originalData.filter(obj => {
            return fnGetvalue(obj).toUpperCase().includes(text)
        }))
    }
    return (
        <FormControl
            placeholder={placeholder}
            onChange={filter}
            style={{width: "80%"}}
      />
    )
}