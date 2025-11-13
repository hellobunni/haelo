/**
 * Common motion animation variants for use with Framer Motion
 */

export const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
	},
};

export const stagger = {
	visible: { transition: { staggerChildren: 0.1 } },
};

