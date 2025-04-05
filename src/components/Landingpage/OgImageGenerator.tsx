// src/components/OgImageGenerator.tsx
import logo from '../../../public/assets/logo.png';

interface OgImageGeneratorProps {
  title: string;
  description: string;
}

const OgImageGenerator = ({ title, description }: OgImageGeneratorProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='relative w-[1200px] h-[630px] border rounded-lg overflow-hidden text-slate-100'>
        <div
          className='absolute inset-0'
          style={{
            background: `linear-gradient(135deg, #4f46e5, #9333ea, #ec4899, #f97316, #10b981, #06b6d4, #a855f7, #f472b6
)`,
            borderRadius: 'inherit',
          }}
        ></div>
        <div className='relative z-10 flex flex-col items-center justify-center w-full h-full p-4 '>
          <div className='flex flex-col items-center justify-center w-full h-full rounded-lg backdrop-blur-lg bg-black/35'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center justify-center rounded-lg'>
                <img src={logo.src} alt='logo' className='h-16 w-16' />
              </div>
              <div className='flex flex-col leading-tight'>
                <span className='truncate font-semibold text-4xl'>Themes</span>
                <span className='truncate text-2xl'>For Shadcn UI</span>
              </div>
            </div>

            <span className='py-4 px-32 flex items-center justify-center text-center'>
              <h3 className='text-lg'>{description}</h3>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OgImageGenerator;
