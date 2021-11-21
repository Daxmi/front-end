import React from 'react';
import { Container } from './Styles';


const Button = ({wave}) => {
   
    return (
        <Container onClick={wave}>
            Click Me
        </Container>
    )
}

export default Button;
