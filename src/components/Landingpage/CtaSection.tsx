'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

export function CtaSection() {
  return (
    <section className='relative py-20 md:py-32'>
      {/* Background gradient */}
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background' />

      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='relative overflow-hidden rounded-3xl border bg-card shadow-xl'>
            {/* Background decoration */}
            <div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl' />

            <div className='relative z-10 p-8 sm:p-12 md:p-16'>
              <div className='grid gap-8 md:grid-cols-5'>
                <div className='flex flex-col md:col-span-3'>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'
                  >
                    Start creating beautiful{' '}
                    <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                      themes today
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className='mb-6 text-muted-foreground'
                  >
                    Join other designers and developers who are already using
                    our platform to create, share, and discover beautiful
                    shadcn/ui themes.
                  </motion.p>

                  <div className=''>
                    <Link href={'/themes'}>
                      <Button
                        size='lg'
                        variant='outline'
                        className='btn-glow group'
                      >
                        Browse All Themes
                        <ChevronRight className='ml-2 h-4 w-4 transition-all group-hover:translate-x-1' />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className='flex flex-col justify-center md:col-span-2'>
                  <ul className='space-y-3'>
                    {[
                      'Access to 100+ community themes',
                      'Create and share your own themes',
                      'Connect with other designers',
                      'Get feedback on your work',
                      'Stay updated with the latest trends',
                    ].map((feature) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                        className='flex items-center gap-2'
                      >
                        <CheckCircle2 className='h-5 w-5 text-primary' />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
