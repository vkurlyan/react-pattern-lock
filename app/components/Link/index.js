import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router'

const Wrapper = styled.div`
  text-align: center;

  & a {
  	color: #fff;
  	display: inline-block;
  	padding: 5px 10px;
  	background-color: #aaa;
  	border-radius:3px;
  	text-decoration: none;
  }
  & a:hover {
  	background-color: #888;
  }
`;

const LinkComponent = (props) => {
	return (
		<Wrapper>
			<Link {...props}>
				{props.children}
			</Link>
		</Wrapper>
	);
}

export default LinkComponent;
