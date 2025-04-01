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
      {/* Vintage overlay for dark mode */}
      {/* {isDark && (
        <div
          className='absolute inset-0 opacity-10 pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '52px 26px',
            mixBlendMode: 'overlay',
          }}
        />
      )} */}

      <div className='mx-auto px-4 pb-12 md:px-6 lg:px-8'>
        <motion.div
          className='container flex flex-col items-center justify-between gap-4 border-t-4 pt-8 sm:flex-row'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className='text-sm text-muted-foreground'>
            <Link href={'#hero'}>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <Logo />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Themes</span>
                  <span className='truncate text-xs'>For Shadcn UI</span>
                </div>
              </div>
            </Link>
          </p>

          <div className='flex gap-4'>
            {[
              {
                icon: <BsTwitterX className='h-5 w-5' />,
                href: '#',
                color: 'hover:text-blue-400',
              },
              {
                icon: <BsGithub className='h-5 w-5' />,
                href: '#',
                color: 'hover:text-gray-500',
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover-glow ${social.color}`}
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
