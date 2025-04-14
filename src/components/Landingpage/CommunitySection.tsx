'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CommunitySection() {
  return (
    <section id='community' className='relative py-20 md:py-32 overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute right-0 top-0 h-[25rem] w-[25rem] translate-x-1/3 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute bottom-0 left-0 h-[20rem] w-[20rem] -translate-x-1/3 rounded-full bg-primary/10 blur-3xl' />
      </div>

      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* Section header */}
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'
          >
            Join our{' '}
            <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              creative community
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className='text-muted-foreground px-4'
          >
            Connect with designers and developers from around the world. Share
            your creations, get inspired, and collaborate on beautiful UI
            themes.
          </motion.p>
        </div>

        {/* Community benefits */}
        <div className='mx-auto max-w-5xl'>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {[
              {
                title: 'Share your themes',
                description:
                  'Publish your custom themes and get feedback from the community.',
              },
              {
                title: 'Collaborate with others',
                description:
                  'Connect with like-minded designers and developers to create together.',
              },
              {
                title: 'Get recognized',
                description:
                  'Gain recognition for your contributions to the ecosystem.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className='flex flex-col rounded-lg border bg-card p-6 shadow-sm'
              >
                <h3 className='mb-2 text-xl font-medium'>{benefit.title}</h3>
                <p className='text-muted-foreground'>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className='mx-auto mt-16 max-w-lg text-center'
        >
          <Button
            size='lg'
            className='group'
            onClick={() => {
              toast.error('Discord community soon');
            }}
          >
            Join Our Community
            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
