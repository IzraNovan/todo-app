function ListHeader() {
	return (
		<div className='py-3 px-3 mt-5 rounded d-flex justify-content-between gap-3 fw-semibold'>
			<div className='d-flex gap-5'>
				<span>No.</span>
				<span>Nama</span>
			</div>
			<span className='align-self-end'>Aksi</span>
		</div>
	);
}

export default ListHeader;
