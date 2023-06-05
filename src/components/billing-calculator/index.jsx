import { useState } from 'react'
import ConsumerForm from './components/consumer-form'
import ProductForm from './components/product-form'
import style from './style.module.css'

export default function BillingCalculator() {
	const [products, setProducts] = useState([])
	const [productFormData, setProductFormData] = useState({
		name: '',
		amount: '',
	})

	const [consumers, setConsumers] = useState([])
	const [consumerFormData, setConsumerFormData] = useState({
		name: '',
		consumed: [],
		service_tax: false,
	})

	const [billingDivision, setBillingDivision] = useState(<></>)

	const handleBillingDivision = () => {
		const willPayServiceTax = consumers.filter(
			(consumer) => consumer.service_tax === true
		)
		let numberOfConsumers = {}

		const message = (
			<>
				{products.map((product) => {
					const consumedProduct = consumers
						.map((consumer) => ({
							costumer: consumer.name,
							product: consumer.consumed,
						}))
						.filter((consumedProduct) => {
							if (
								consumedProduct.product.some(
									(consumed) => consumed.name === product.name
								)
							) {
								return consumedProduct.costumer
							}
						})

					numberOfConsumers = {
						...numberOfConsumers,
						[product.name]: consumedProduct.length,
					}

					return (
						<div className={style.consumedProducts}>
							{consumedProduct.length === consumers.length ? (
								<span>Todos consumiram {product.name}</span>
							) : consumedProduct.length !== 0 ? (
								<span>
									{consumedProduct
										.map((consumedProduct) => consumedProduct.costumer)
										.reduce((prevName, currName, index, originalArr) => {
											if (originalArr.length <= 1) {
												return currName
											}
											if (index === originalArr.length) {
												return (prevName += `e ${currName}`)
											}

											return `${prevName}, ${currName}`
										}) + ` consumiram ${product.name}`}
								</span>
							) : (
								<span>Ninguém consumiu {product.name}</span>
							)}
						</div>
					)
				})}

				<div className={style.serviceTaxPayment}>
					{willPayServiceTax
						.map((customer) => {
							return customer.name
						})
						.reduce((prevName, currName, index, originalArr) => {
							if (originalArr.length <= 1) {
								return currName
							}
							if (index === originalArr.length) {
								return (prevName += `e ${currName}`)
							}

							return `${prevName}, ${currName}`
						}) +
						`${willPayServiceTax.length > 1 ? ' Irão' : ' Irá'} pagar os 10%`}
				</div>

				<div className={style.dividedBilling}>
					{consumers.map((consumer) => {
						let amountToPay = 0
						consumer.consumed.forEach(
							(productConsumed) =>
								(amountToPay +=
									Number(productConsumed.amount) /
									numberOfConsumers[productConsumed.name])
						)

						if (
							willPayServiceTax.some(
								(serviceTaxContribuitors) =>
									serviceTaxContribuitors.name === consumer.name
							)
						) {
							amountToPay += 0.1 * amountToPay
						}

						return (
							<span>
								{consumer.name}: R${amountToPay}
							</span>
						)
					})}
				</div>
			</>
		)

		setBillingDivision(message)
	}

	return (
		<>
			<div className={style.forms}>
				<ProductForm
					productFormData={productFormData}
					setProductFormData={setProductFormData}
					products={products}
					setProducts={setProducts}
				/>

				<ConsumerForm
					consumerFormData={consumerFormData}
					setConsumerFormData={setConsumerFormData}
					consumers={consumers}
					setConsumers={setConsumers}
					products={products}
				/>
			</div>

			<div className={style.consumersList}>
				<table>
					<tbody>
						{consumers.map((consumer) => (
							<tr
								key={`Consumidor: ${consumer.name}, consumiu ${consumer.consumed.length} produtos`}
							>
								<td>{consumer.name}</td>
								<td>
									Taxa de serviço: {consumer.service_tax ? 'Sim' : 'Não'}{' '}
								</td>
								<td>Produtos consumidos: {consumer.consumed.length}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button
					hidden={consumers.length < 1 && true}
					onClick={handleBillingDivision}
				>
					Calcular divisão da conta
				</button>
			</div>

			<div className={style.finalResults}>
				{billingDivision && billingDivision}
			</div>
		</>
	)
}
