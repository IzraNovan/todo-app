import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { request } from '../axios/request';
import PropTypes from 'prop-types';

function Input({ todoList, setTodoList }) {
	const [todo, setTodo] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAdd = async (e) => {
		e.preventDefault();
		setLoading(true);

		const payload = {
			nama: todo,
		};

		try {
			const res = await request.post('/todos', payload);

			setTodoList([...todoList, res.data]);
			setTodo('');
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Form
				onSubmit={handleAdd}
				className='d-flex gap-3 align-items-center mt-5'
				style={{ width: '500px' }}>
				<div className='col-9'>
					<Form.Group style={{ width: '100%' }}>
						<Form.Control
							required
							type='text'
							placeholder='Masukkan text'
							className='py-1.5 px-2'
							value={todo}
							onChange={(e) => setTodo(e.target.value)}
						/>
					</Form.Group>
				</div>

				<div className='col-3'>
					<Button type='submit' disabled={loading}>
						{loading ? 'Menambahkan...' : 'Tambah'}
					</Button>
				</div>
			</Form>
		</>
	);
}

export default Input;

Input.propTypes = {
	todoList: PropTypes.array,
	setTodoList: PropTypes.func,
};
