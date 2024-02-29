import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { request } from '../axios/request';
import toast from 'react-hot-toast';

function ModalEdit({
	show,
	handleClose,
	selectedTodo,
	setTriggerChange,
}) {
	const [todo, setTodo] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchDetailTodo = async () => {
			try {
				const res = await request.get(`/todos/${selectedTodo.id}`);
				setTodo(res.data.nama);
			} catch (error) {
				console.log(error);
			}
		};

		fetchDetailTodo();
	}, []);

	const handleEdit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const payload = {
			nama: todo,
		};

		try {
			await request.put(`/todos/${selectedTodo.id}`, payload);
			toast.success('Berhasil mengubah');

			setTriggerChange(true);
			handleClose();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Ubah Nama Kegiatan</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleEdit}>
					<Modal.Body>
						<Form.Group style={{ width: '100%' }}>
							<Form.Control
								autoFocus={true}
								type='text'
								placeholder='Masukkan nama kegiatan'
								className='py-1.5 px-2'
								value={todo}
								onChange={(e) => setTodo(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Batal
						</Button>
						<Button type='submit' disabled={loading}>
							{loading ? 'Mengubah...' : 'Ubah'}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}

export default ModalEdit;

ModalEdit.propTypes = {
	show: PropTypes.bool,
	handleClose: PropTypes.func,
	selectedTodo: PropTypes.object,
	setTriggerChange: PropTypes.func,
};
