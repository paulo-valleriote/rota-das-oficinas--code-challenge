import { useEffect, useState } from 'react'
import style from './style.module.css'

const cols = 30
const rows = 30
const randomGrid = () => {
	const grid = []
	for (let i = 0; i < rows; i++) {
		const row = []
		for (let j = 0; j < cols; j++) {
			row.push(Math.floor(Math.random() * 2))
		}
		grid.push(row)
	}
	return grid
}
const positions = [
	[0, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
]

export default function GameOfLife() {
	const [grid, setGrid] = useState()
	const [isRunning, setIsRunning] = useState(false)

	useEffect(() => {
		setGrid(randomGrid())
	}, [])

	const runSimulation = () => {
		setGrid((g) => {
			const next = g.map((row, i) => {
				return row.map((cell, j) => {
					let sum = 0
					positions.forEach((positions) => {
						const x = i + positions[0]
						const y = j + positions[1]

						if (x >= 0 && x < rows && y >= 0 && y < cols) {
							sum += g[x][y]
						}
					})

					if (sum < 2 || sum > 3) {
						return 0
					}

					if (sum === 3) {
						return 1
					}

					return g[i][j]
				})
			})
			return next
		})
	}

	return (
		<>
			<div className={style.gameOfLifeControls}>
				<button
					className={style.runButton}
					onClick={() => {
						setIsRunning(!isRunning)

						setInterval(() => {
							runSimulation(grid)
						}, 1000)
					}}
				>
					{isRunning ? 'Stop' : 'Run'}
				</button>
				<button
					className={style.resetButton}
					onClick={() => setGrid(randomGrid)}
				>
					Reset
				</button>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{grid &&
					grid.map((rows, i) =>
						rows.map((col, k) => (
							<div
								className={style.gameOfLifeGrid}
								style={{
									backgroundColor: grid[i][k] ? 'green' : '',
								}}
							/>
						))
					)}
			</div>
		</>
	)
}
