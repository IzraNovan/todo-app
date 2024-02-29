import { useEffect, useState } from 'react';
import Input from './components/Input';
import List from './components/List';
import ListHeader from './components/ListHeader';
import { request } from './axios/request';
import { Toaster } from 'react-hot-toast';

function App() {
	const [todoList, setTodoList] = useState([]);
	const [triggerChange, setTriggerChange] = useState(false);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const res = await request.get('/todos');

				setTodoList(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchTodos();

		return () => setTriggerChange(false);
	}, [triggerChange]);

	return (
		<div
			className='d-flex flex-column justify-content-center align-items-center'
			style={{ width: '100vw' }}>
			<Toaster />
			<h2 className='text-center mt-5'>My Todo List</h2>

			<Input todoList={todoList} setTodoList={setTodoList} />

			<div className='d-flex flex-column container-list'>
				<ListHeader />
				<List
					todoList={todoList}
					setTriggerChange={setTriggerChange}
				/>
			</div>
		</div>
	);
}

export default App;
