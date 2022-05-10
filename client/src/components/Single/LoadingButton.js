import React, {useState,useEffect,render} from "react";
import "../../scss/_variables.scss";
import "../../scss/index.scss";
import {Button} from "react-bootstrap";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}
  
export default function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
        simulateNetworkRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return(
        <div mt="2">
            <Button             
                variant="secondary" 
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? 'Cargando...' : 'Entregar'}
            </Button>
        </div>
    );
}

// render(<LoadingButton />);