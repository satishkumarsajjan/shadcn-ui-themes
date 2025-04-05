'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Link } from 'next-view-transitions';
import { BsGithub, BsTwitterX } from 'react-icons/bs';
import Logo from '../Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <footer className='relative border-t bg-card/50'>
      <div className='mx-auto px-4 pb-12 md:px-6 lg:px-8'>
        <motion.div
          className='container flex flex-col items-center justify-between gap-4 border-t-4 pt-8 sm:flex-row'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Logo />

          <div className='flex gap-4'>
            {[
              {
                icon: <BsTwitterX className='h-5 w-5' />,
                href: 'https://x.com/iamsatish4564',
                color: 'hover:text-blue-400',
              },
              {
                icon: <BsGithub className='h-5 w-5' />,
                href: 'https://github.com/satishkumarsajjan/shadcn-ui-themes',
                color: 'hover:text-gray-500',
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover-glow ${social.color}`}
                target='_blank'
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
