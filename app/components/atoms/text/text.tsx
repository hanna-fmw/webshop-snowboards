import styles from './text.module.css'

type MyButtonProps = {
	label?: string
	buttonBackground?: string
	borderRadius?: string
	onClick?: () => void
}

const Text = ({ label = 'Knapp', buttonBackground = 'coral' }: MyButtonProps) => {
	return (
		<button className={styles.textStyle} style={{ backgroundColor: buttonBackground }}>
			{label}
		</button>
	)
}

export default Text
