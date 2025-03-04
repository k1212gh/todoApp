import React from "react";
import styled from "styled-components";

const Spacer = styled.div<{ size: number }>`
  height: ${(props) => props.size}px;
`;

export default Spacer;
