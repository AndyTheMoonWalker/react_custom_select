import { useEffect, useState } from 'react';
import style from './select.component.module.css';

export type SelectOption = {
	label: string;
	value: string | number;
};

type MultiSelectProps = {
	multi: true;
	value: SelectOption[];
	onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
	multi?: false;
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
	options: SelectOption[];
} & (SingleSelectProps | MultiSelectProps);

function Select({ multi, value, onChange, options }: SelectProps) {
	const [isOpened, setIsOpened] = useState(false);
	const [hovered, setHovered] = useState(0);
	const showHandler = () => {
		setIsOpened((prev) => !prev);
	};

	function clear() {
		multi ? onChange([]) : onChange(undefined);
	}

	function selectOption(option: SelectOption) {
		if (multi) {
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option));
			} else {
				onChange([...value, option]);
			}
		} else {
			if (option !== value) {
				onChange(option);
			}
		}
	}

	function isOptionSelected(option: SelectOption) {
		return multi ? value.includes(option) : option === value;
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
			<span className={style.value}>
				{multi
					? value.map((v) => (
							<button
								className={style['option-badge']}
								key={v.value}
								onClick={(e) => {
									e.stopPropagation();
									selectOption(v);
								}}
							>
								{v.label}
								<span className={style['remove-btn']}>x</span>
							</button>
					  ))
					: value?.label}
			</span>
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
