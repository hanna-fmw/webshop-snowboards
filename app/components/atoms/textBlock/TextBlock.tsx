import React from 'react'
import styles from './textBlock.module.css'

type TextBlockProps = {
	children?: React.ReactNode
	name?: string
	model?: string
	detail?: string
	length?: string
	profile?: string
	price?: number
	designer?: string
	boardType?: string
	lengthForModel?: string[]
}

const TextBlock = ({ name, model, length, lengthForModel, detail, designer, boardType, profile, children }: TextBlockProps) => {
	return (
		<div className={styles.textBlock}>
			<div>
				<div>{name}</div>
				<div>{designer}</div>
				<div>{boardType}</div>
				<div>{detail}</div>
				<div>{length}</div>
				<div>{lengthForModel}</div>
				<div>{profile}</div>
			</div>
		</div>
	)
}

export default TextBlock
