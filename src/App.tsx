import { useState } from 'react';
import Select, { SelectOption } from './components/select.component';

const options = [
	{ label: 'First', value: 1 },
	{ label: 'Second', value: 2 },
	{ label: 'Third', value: 3 },
];
function App() {
	const [value, setValue] = useState<SelectOption[]>([options[0]]);
	const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);
	return (
		<div className='App'>
			<Select
				multi
				options={options}
				value={value}
				onChange={(o) => {
					setValue(o);
				}}
			/>
			<Select
				options={options}
				value={value2}
				onChange={(o) => {
					setValue2(o);
				}}
			/>
		</div>
	);
}

export default App;
