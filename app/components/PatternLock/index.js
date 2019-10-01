import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { getByAttr } from '../../utils/get-by-attr';
import { Polyline, Circle, Dot } from './svg';

const Wrapper = styled.div`
  text-align: center;
  touch-action: none;
`;

const defaultParams = {
	svgWidth: 400,
	svgHeight: 400,
	columns: 3,
	rows: 3,
}

export default class PatternLock extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {};
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
	}

	/**
	 * Calculate parameters and sizes of svg
	 * @return {{}} params
	 */
	generateParams() {
		const params = {
			...defaultParams,
			...this.props
		}
		params.cellSize = Math.floor(params.svgWidth / params.columns);
		params.halfCellSize = Math.floor(params.cellSize / 2);
		params.circleRadius = Math.floor(params.cellSize * 0.35);
		params.smallCircleRadius = Math.floor(params.circleRadius * 0.3);
		return params;
	}

	/**
	 * Generate circles models
	 * @param  {{}} params 
	 * @return {[]}
	 */
	getCirclesCollection(params) {
		let circles = [];
		let key = 0;

		for (let i = 0; i < params.columns; i++) {
			for (let j = 0; j < params.rows; j++) {
				circles.push({
					key: key++,
					x: j * params.cellSize + params.halfCellSize,
					y: i * params.cellSize + params.halfCellSize,
				});
			}
		}

		return circles;
	}

	/**
	 * Generate points for polyline element
	 * @return {string} example: "0,0 10,10 10,20"
	 */
	getLinePoints() {
		const { pattern = [] } = this.props;
		const { circles } = this.state;
		let points = [];

		for (let i = 0; i < pattern.length; i++) {
			let circle = getByAttr(circles, 'key', pattern[i]);
			points.push(`${circle.x},${circle.y}`);
		}

		return points.join(' ');
	}

	/**
	 * Check is circle already selected
	 * @param  {number}  key - circle key
	 * @return {Boolean}
	 */
	isSelected(key) {
		return this.props.pattern.length && (this.props.pattern.indexOf(key) !== -1);
	}

	/**
	 * Attach onmouseup event listener.
	 * Calculate pattern parameters and save it to state
	 */
	componentWillMount() {
		document.addEventListener('mouseup', this.onMouseUp, false);

		const params = this.generateParams();
		this.setState({
			params,
			circles: this.getCirclesCollection(params)
		})
	}

    /**
     * removes event listener from document
     */
	componentWillUnmount() {
		document.removeEventListener('mouseup', this.onMouseUp, false);
	}

	onMouseDown(event) {
		if (!this.props.isSync) {
			this.setState({ mouseDown: true })
			this.selectCircle(event);
		}
	}

	onMouseUp(event) {
		if (this.state.mouseDown && !this.props.isSync) {
			this.setState({ mouseDown: false });
			this.props.onPatternSelected();
		}
	}

	onMouseEnter(event) {
		if (this.state.mouseDown && !this.props.isSync) {
			this.selectCircle(event);
		}
	}

	/**
	 * For Mobile Events
	 */
	onTouchStart(event) {
		this.onMouseDown(event);
	}

	onTouchEnd(event) {
		this.onMouseUp(event);
	}

	onTouchMove(event) {

		var touchLocation = event.changedTouches[0];
		var target = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

		if (target) {
			const parentNode = target.parentElement || target.parentNode;
			const key = parseInt(parentNode.getAttribute('data-key'));

			if (key) {
				event.target = target;
				this.onMouseEnter(event)
			}
		}

	}
	/**
	 * Dispatch select action if new circle is selected
	 * @param  {{}} event
	 */
	selectCircle(event) {
		const parentNode = event.target.parentElement || event.target.parentNode;
		const key = parseInt(parentNode.getAttribute('data-key'));

		if (!this.isSelected(key)) {
			this.props.onCircleSelected(key);
		}
	}

	render() {
		const { params, circles } = this.state;
		const points = this.getLinePoints();
		const self = this;

		return (
			<Wrapper>
				<svg
					width={params.svgWidth}
					height={params.svgHeight}
					viewBox={`0 0 ${params.svgWidth} ${params.svgHeight}`}
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					{points && <Polyline points={points} />}

					{circles.map((circle) => {
						const className = self.isSelected(circle.key) ? 'selected' : undefined;

						return (
							<g
								key={`${circle.key}`}
								data-key={circle.key}
								onMouseDown={self.onMouseDown}
								onMouseEnter={self.onMouseEnter}
								onTouchStart={(e) => self.onTouchStart(e)}
								onTouchEnd={(e) => self.onTouchEnd(e)}
								onTouchMove={(e) => self.onTouchMove(e)}
							>
								<Circle
									cx={circle.x}
									cy={circle.y}
									r={params.circleRadius}
									className={className}
								/>
								<Dot cx={circle.x} cy={circle.y} r={params.smallCircleRadius} />
							</g>
						);
					})}

				</svg>
			</Wrapper>
		);
	}
}

PatternLock.propTypes = {
	svgWidth: PropTypes.number,
	svgHeight: PropTypes.number,
	colums: PropTypes.number,
	rows: PropTypes.number,
	pattern: PropTypes.array,
	onCircleSelected: PropTypes.func.isRequired,
	onPatternSelected: PropTypes.func.isRequired,
};
