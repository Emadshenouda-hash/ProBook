import React from 'react';
import { motion, MotionProps } from 'framer-motion';

export const FadeIn: React.FC<React.PropsWithChildren<MotionProps>> = ({ children, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const StaggerChildren: React.FC<React.PropsWithChildren<{ delay?: number } & MotionProps>> = ({ children, delay = 0.1, ...rest }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: delay
        }
      }
    }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const ItemUp: React.FC<React.PropsWithChildren<MotionProps>> = ({ children, ...rest }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);

