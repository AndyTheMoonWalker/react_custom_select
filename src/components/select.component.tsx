import { useEffect, useState } from 'react';
import style from './select.component.module.css';

type SelectOption = {
	label: string;
	value: string | number;
};

type SelectProps = {
	options: SelectOption[];
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

function Select({ value, onChange, options }: SelectProps) {
	const [isOpened, setIsOpened] = useState(false);
	const [hovered, setHovered] = useState(0);
	const showHandler = () => {
		setIsOpened((prev) => !prev);
	};

	function clear() {
		onChange(undefined);
	}

	function selectOption(option: SelectOption) {
		if (option !== value) {
			onChange(option);
		}
	}

	function isOptionSelected(option: SelectOption) {
		return option === value;
	}

	useEffect(() => {
		if (isOpened) {
			setHovered(0);
		}
	}, [isOpened]);

	return (
		<div
			onBlur={() => setIsOpened(false)}
			onClick={showHandler}
			tabIndex={0}
			className={style.container}
		>
			<span className={style.value}>{value?.label}</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					clear();
				}}
				className={style['clear-btn']}
			>
				x
			</button>
			<div className={style.divider}></div>
			<div className={style.caret}></div>
			<ul className={`${style.options} ${isOpened ? style.show : ''}`}>
				{options.map((option, index) => (
					<li
						onMouseEnter={() => setHovered(index)}
						onClick={(e) => {
							e.stopPropagation();
							selectOption(option);
							setIsOpened(false);
						}}
						key={option.value}
						className={`${style.option} ${
							isOptionSelected(option) ? style.selected : ''
						} ${index === hovered ? style.hovered : ''}`}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Select;
