'use client';

import { motion } from 'framer-motion';
import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

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
      {isDark && (
        <div
          className='absolute inset-0 opacity-10 pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '52px 26px',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8'>
        <motion.div
          className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Brand and description */}
          <motion.div
            className='col-span-2 lg:col-span-2'
            variants={itemVariants}
          >
            <Link href='/' className='mb-4 flex items-center gap-2 group'>
              <motion.div
                className='flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground hover-glow'
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                TM
              </motion.div>
              <span className='font-bold text-xl group-hover:text-primary transition-colors'>
                ThemeManager
              </span>
            </Link>
            <p className='mb-4 max-w-xs text-muted-foreground'>
              Create, discover, and share beautiful shadcn/ui themes for your
              next project.
            </p>
            <div className='flex gap-4'>
              {[
                {
                  icon: <Twitter className='h-5 w-5' />,
                  href: '#',
                  color: 'hover:text-blue-400',
                },
                {
                  icon: <Github className='h-5 w-5' />,
                  href: '#',
                  color: 'hover:text-gray-500',
                },
                {
                  icon: <Linkedin className='h-5 w-5' />,
                  href: '#',
                  color: 'hover:text-blue-600',
                },
                {
                  icon: <Instagram className='h-5 w-5' />,
                  href: '#',
                  color: 'hover:text-pink-600',
                },
                {
                  icon: <Facebook className='h-5 w-5' />,
                  href: '#',
                  color: 'hover:text-blue-500',
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

          {/* Navigation sections */}
          {[
            {
              title: 'Product',
              links: [
                { label: 'Features', href: '#features' },
                { label: 'Themes', href: '#themes' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Roadmap', href: '#' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Contact', href: '#' },
              ],
            },
            {
              title: 'Resources',
              links: [
                { label: 'Documentation', href: '#' },
                { label: 'Help Center', href: '#' },
                { label: 'Community', href: '#community' },
                { label: 'GitHub', href: '#' },
              ],
            },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              transition={{ delay: 0.1 * sectionIndex }}
            >
              <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider'>
                {section.title}
              </h3>
              <ul className='space-y-2'>
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className='text-muted-foreground transition-colors hover:text-foreground fancy-underline'
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className='text-sm text-muted-foreground'>
            © {currentYear} ThemeManager. All rights reserved.
          </p>
          <div className='flex gap-6 text-sm text-muted-foreground'>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
              (item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href='#'
                    className='transition-colors hover:text-foreground fancy-underline'
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
