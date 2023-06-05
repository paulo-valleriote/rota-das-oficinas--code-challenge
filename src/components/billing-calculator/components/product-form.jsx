import style from '../style.module.css'

export default function ProductForm({
	productFormData,
	setProductFormData,
	products,
	setProducts,
}) {
	const handleAddProduct = (e) => {
		e.preventDefault()

		setProducts([...products, { ...productFormData }])
		setProductFormData({ name: '', amount: '' })
	}

	const handleProductFormChange = (e) => {
		setProductFormData({ ...productFormData, [e.target.id]: e.target.value })
	}

	return (
		<>
			<form className={style.productForm}>
				<h2>Produtos</h2>

				<label className={style.productName}>
					Produto
					<input
						type='text'
						id='name'
						value={productFormData.name}
						onChange={handleProductFormChange}
						autoComplete='off'
					/>
				</label>

				<label className={style.productAmount}>
					Preço
					<input
						type='text'
						id='amount'
						value={productFormData.amount}
						onChange={handleProductFormChange}
						autoComplete='off'
					/>
				</label>

				<button
					onClick={handleAddProduct}
					disabled={
						productFormData.name && productFormData.amount ? false : true
					}
				>
					Adicionar Produto
				</button>
			</form>
		</>
	)
}
