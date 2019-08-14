import React, { Component } from 'react'
import styled from 'styled-components'

import QuotesWrapper from './QuotesWrapper';
import VideoWrapper from './VideoWrapper';
import PosterWrapper from './PosterWrapper'

const Wrapper = styled.div`
  height: calc(80vh - 5rem);
  width: 100%;
`

export default class MainWrapper extends Component {
  render() {
    return (
      <Wrapper>
        {/* <QuotesWrapper/> */}
        {/* <VideoWrapper /> */}
        <PosterWrapper/>
      </Wrapper>
    )
  }
}
