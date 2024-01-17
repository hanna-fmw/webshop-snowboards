import "./myButton.css" 

type MyButtonProps = {
	label?: string
	buttonBackground?: string
	borderRadius?: string
	onClick?: () => void
}

const MyButton = ({ label = 'Knapp', buttonBackground = 'coral', borderRadius}: MyButtonProps) => {
	return (
		<button className='buttonStyle' style={{ backgroundColor: buttonBackground, borderRadius  }}>
			{label}
		</button>
	)
}

export default MyButton



