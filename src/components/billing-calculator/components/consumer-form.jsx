import style from '../style.module.css'

export default function ConsumerForm({
	consumerFormData,
	setConsumerFormData,
	consumers,
	setConsumers,
	products,
}) {
	const handleAddConsumer = (e) => {
		e.preventDefault()

		setConsumers([...consumers, { ...consumerFormData }])
		setConsumerFormData({ consumed: [], service_tax: false, name: '' })
	}

	const handleConsumerFormChange = (e) => {
		if (e.target.id === 'service_tax') {
			return setConsumerFormData({
				...consumerFormData,
				service_tax: !consumerFormData.service_tax,
			})
		}
		setConsumerFormData({ ...consumerFormData, [e.target.id]: e.target.value })
	}

	const handleConsumerProducts = (e) => {
		const selectedProduct = products.find(
			(product) => product.name === e.target.value
		)
		setConsumerFormData({
			...consumerFormData,
			consumed: [...consumerFormData.consumed, { ...selectedProduct }],
		})
	}

	return (
		<>
			<form className={style.consumerForm}>
				<h2>Clientes</h2>

				<label className={style.consumerName}>
					Cliente
					<input
						type='text'
						id='name'
						value={consumerFormData.name}
						onChange={handleConsumerFormChange}
						required
						autoComplete='off'
					/>
				</label>

				<label className={style.consumerServiceTax}>
					Taxa de serviço
					<input
						type='checkbox'
						id='service_tax'
						value={consumerFormData.service_tax}
						onChange={handleConsumerFormChange}
						checked={consumerFormData.service_tax}
					/>
				</label>

				<div className={style.consumerProducts}>
					Produtos consumidos:
					{products.length > 0 &&
						products.map((product) => (
							<label key={product.name}>
								<input
									type='checkbox'
									id='product'
									value={product.name}
									onChange={handleConsumerProducts}
									checked={
										consumerFormData.consumed.some(
											(consumed) => consumed.name === product.name
										) && true
									}
								/>
								{product.name}
							</label>
						))}
				</div>

				<button
					onClick={handleAddConsumer}
					disabled={
						consumerFormData.consumed.length < 1 ||
						(!consumerFormData.name && true)
					}
				>
					Adicionar Cliente
				</button>
			</form>
		</>
	)
}
