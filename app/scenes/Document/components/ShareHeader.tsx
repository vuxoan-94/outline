import React from 'react';
import styled from "styled-components";
import shareLogo from './share-logo.png';

function ShareHeader() {
    return (
        <Wrapper>
            <img src={shareLogo} alt="share-logo" />
        </Wrapper>
    );
}

const ImageWrapper = styled.div`
    padding: 0 20px;
`

const Wrapper = styled.div`
    width: 100%;
    padding: 10px 8px;
    background-color: #1b1b1b;
`

export default ShareHeader;