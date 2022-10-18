import style from './select.component.module.css';

type SelectOption = {
	label: string;
	value: any;
};

type SelectProps = {
	options: SelectOption[];
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

function Select({ value, onChange, options }: SelectProps) {
	return (
		<div className={style.container}>
			<span className={style.value}>Val</span>
			<button className={style['clear-btn']}>x</button>
			<div className={style.divider}></div>
			<div className={style.caret}></div>
			<ul className={style.options}>
				{options.map((option) => (
					<li key={option.label} className={style.option}>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Select;
