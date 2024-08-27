'use client'
import { motion } from 'framer-motion'

// Animation variants for the main content
const variants = {
	initial: { opacity: 0, y: 100 },
	animate: (index: number) => ({
		opacity: 1,
		y: 0,

		transition: {
			delay: 0.25 * index,
			duration: 0.7,
		},
	}),
}

// Template component wraps children with animation
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.main
			variants={variants}
			initial='initial'
			whileInView='animate'
			viewport={{ once: true }}>
			{children}
		</motion.main>
	)
}
