import { useState } from 'react'
import style from './style.module.css'

function DigitConverter() {
	const [num, setNum] = useState(0)
	const [string, setString] = useState('')

	const [conversions, setConversions] = useState({
		romanToArabic: '',
		arabicToRoman: '',
	})

	const findArabicToRomanEquivalence = ({ number, romanSet }) => {
		const m = ['', 'M', 'MM', 'MMM']
		const c = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
		const x = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
		const i = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

		switch (romanSet) {
			case 'm' || 'thousands':
				return m[Math.floor(number / 1000)]

			case 'c' || 'hundreds':
				return c[Math.floor((number % 1000) / 100)]

			case 'x' || 'tens':
				return x[Math.floor((number % 100) / 10)]

			case 'i' || 'units':
				return i[Math.floor(number % 10)]

			default:
				return ''
		}
	}

	const convertArabicToRoman = (number) => {
		const conversionSteps = ['m', 'c', 'x', 'i']

		const convertedNumber = []

		conversionSteps.forEach((step) => {
			const roman = findArabicToRomanEquivalence({ number, romanSet: step })
			convertedNumber.push(roman)
		})

		return setConversions({
			...conversions,
			arabicToRoman: convertedNumber.join(''),
		})
	}

	const convertRomanToArabic = (romanNumber) => {
		const equivalences = {
			M: 1000,
			D: 500,
			C: 100,
			L: 50,
			X: 10,
			V: 5,
			I: 1,
		}

		const numbers = romanNumber.toUpperCase().split('')

		let convertedArabic = 0
		for (let i = 0; i < numbers.length; i++) {
			const firstEquivalence = equivalences[numbers[i]]
			const secondEquivalence = equivalences[numbers[i + 1]] || 0

			if (firstEquivalence < secondEquivalence) {
				convertedArabic += secondEquivalence - firstEquivalence
				i++
			} else {
				convertedArabic += firstEquivalence
			}
		}

		return setConversions({ ...conversions, romanToArabic: convertedArabic })
	}

	return (
		<div className={style.converters}>
			<div className={style.romanConverter}>
				<input type='text' onChange={(e) => setNum(e.target.value)} />
				<button onClick={() => convertArabicToRoman(Number(num))}>
					Converter para romano
				</button>
				{conversions.arabicToRoman && (
					<span>Convertido: {conversions.arabicToRoman}</span>
				)}
			</div>

			<div className={style.arabicConverter}>
				<input type='text' onChange={(e) => setString(e.target.value)} />
				<button onClick={() => convertRomanToArabic(string)}>
					Converter para decimal
				</button>
				{conversions.romanToArabic && (
					<span>Convertido: {conversions.romanToArabic}</span>
				)}
			</div>
		</div>
	)
}

export default DigitConverter
