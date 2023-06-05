import React from 'react'
import ReactDOM from 'react-dom/client'
import DigitConverter from './components/digit-converter/digit-converter.jsx'
import BillingCalculator from './components/billing-calculator/index.jsx'
import './global.css'
import GameOfLife from './components/game-of-life/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '6rem',
				padding: '2rem',
			}}
		>
			<div>
				<h2>Desafio #1</h2>
				<DigitConverter />
			</div>

			<div>
				<h2>Desafio #2</h2>
				<GameOfLife />
			</div>

			<div>
				<h2>Desafio #3</h2>
				<BillingCalculator />
			</div>
		</main>
	</React.StrictMode>
)
