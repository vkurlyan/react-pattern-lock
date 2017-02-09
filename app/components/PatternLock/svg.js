import styled from 'styled-components';

export const Polyline = styled.polyline`
  stroke: #ccc;
  stroke-width: 5;
  fill:none;
  user-select: none;
`;

export const Circle = styled.circle`
  stroke: #808080;
  stroke-width: 4;
  fill: #b3b3b3;
  opacity: 0.7;
  user-select: none;

  &.selected {
    stroke: #cc0e00;
  	fill: #f00;
  	opacity: 1;
  }
  g:hover & {
  	opacity: 1;
  	cursor:pointer;
  }
`;

export const Dot = styled.circle`
  fill: #fff;
  opacity: 0.8;
  user-select: none;

  g:hover & {
  	cursor:pointer;
  }
`;