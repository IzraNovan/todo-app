import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { request } from '../axios/request';
import PencilIcon from '../assets/icons/PencilIcon';
import TrashIcon from '../assets/icons/TrashIcon';
import ModalEdit from './ModalEdit';

function List({ todoList, setTriggerChange }) {
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState('');

	const handleClose = () => setShowEditModal(false);
	const handleShow = () => setShowEditModal(true);

	const renderTooltip = (props, text) => (
		<Tooltip id='button-tooltip' {...props}>
			{text}
		</Tooltip>
	);

	const handleDelete = async (todo_id) => {
		try {
			await request.delete(`/todos/${todo_id}`);
			setTriggerChange(true);
			// setTodoList(todoList.filter((todo) => todo.id !== todo_id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className=''>
				{todoList?.map((todo, index) => {
					return (
						<div
							key={todo?.id}
							className='py-3 px-3 mt-2 border rounded d-flex justify-content-between align-items-center gap-3 text-white fw-medium'
							style={{ backgroundColor: 'teal' }}>
							<div className='d-flex gap-5'>
								<span>{index + 1}.</span>
								<span>{todo?.nama}</span>
							</div>
							<span className='d-flex gap-2'>
								<OverlayTrigger
									placement='right'
									delay={{ show: 250, hide: 400 }}
									overlay={(props) => renderTooltip(props, 'Ubah')}>
									<Button
										variant='primary'
										onClick={() => {
											setSelectedTodo(todo);
											handleShow(todo?.id);
										}}>
										<PencilIcon />
									</Button>
								</OverlayTrigger>

								<OverlayTrigger
									placement='right'
									delay={{ show: 250, hide: 400 }}
									overlay={(props) => renderTooltip(props, 'Hapus')}>
									<Button
										variant='danger'
										onClick={() => handleDelete(todo?.id)}>
										<TrashIcon />
									</Button>
								</OverlayTrigger>
							</span>
						</div>
					);
				})}
			</div>

			{showEditModal && (
				<ModalEdit
					show={showEditModal}
					selectedTodo={selectedTodo}
					handleClose={handleClose}
					setTriggerChange={setTriggerChange}
				/>
			)}
		</>
	);
}

export default List;

List.propTypes = {
	todoList: PropTypes.array,
	setTodoList: PropTypes.func,
	setTriggerChange: PropTypes.func,
};
