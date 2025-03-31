'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '../theme/ModeToggle';
import { useSession } from 'next-auth/react';
import { Dialog, DialogTrigger } from '../ui/dialog';
import SignInDialogContent from '../auth/SignInDialogContent';
import CreateNewTheme from '../theme/createNewTheme/create-new-theme';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed overflow-x-hidden top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 transition-all duration-200 md:px-6 lg:px-8 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 outline-none'>
          <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold'>
            TM
          </div>
          <span className='font-semibold text-lg'>ThemeManager</span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden items-center gap-1 md:flex'>
          <NavLinks className='mr-4' />
          <div className='flex items-center gap-3'>
            <ModeToggle />
            {!session?.user && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex w-full justify-between px-2'
                  >
                    <span>Sign in</span>
                    <span className='sr-only'>Sign in</span>
                  </Button>
                </DialogTrigger>
                <SignInDialogContent />
              </Dialog>
            )}
            <CreateNewTheme className='bg-primary' />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='flex md:hidden'>
          <div className='flex items-center gap-3'>
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-foreground'
                >
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <div className='flex h-full flex-col'>
                  <div className='flex items-center justify-between py-4'>
                    <Link href='/' className='flex items-center gap-2'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold'>
                        TM
                      </div>
                      <span className='font-semibold text-lg'>
                        ThemeManager
                      </span>
                    </Link>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <X className='h-5 w-5' />
                    </Button>
                  </div>

                  <div className='flex flex-col gap-8 py-4'>
                    <NavLinks mobileNav />
                    <div className='flex flex-col gap-3'>
                      <Button
                        variant='outline'
                        className='w-full justify-center'
                      >
                        Sign In
                      </Button>
                      <CreateNewTheme />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

interface NavLinksProps {
  className?: string;
  mobileNav?: boolean;
}

function NavLinks({ className = '', mobileNav = false }: NavLinksProps) {
  const links = [
    { href: '#features', label: 'Features' },
    { href: '#themes', label: 'Themes' },
    { href: '#community', label: 'Community' },
  ];

  return (
    <div
      className={`flex items-center gap-1 ${
        mobileNav ? 'flex-col items-start gap-5' : className
      }`}
    >
      {links.map((link, i) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
        >
          <Link
            href={link.href}
            className={
              mobileNav
                ? 'text-lg font-medium text-foreground hover:text-primary transition-colors'
                : 'relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            }
          >
            {link.label}
            {!mobileNav && (
              <motion.span
                className='absolute bottom-0 left-0 h-0.5 w-0 bg-primary'
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
