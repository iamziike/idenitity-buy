import { motion } from 'framer-motion';

export const routeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const routeVariantsKeys = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};

const RouteAnimationContainer = ({
  children,
  className = '',
  isAncestor = true,
}) => {
  const animateKeys = isAncestor ? routeVariantsKeys : {};

  return (
    <motion.div className={className} variants={routeVariants} {...animateKeys}>
      {children}
    </motion.div>
  );
};

export default RouteAnimationContainer;
