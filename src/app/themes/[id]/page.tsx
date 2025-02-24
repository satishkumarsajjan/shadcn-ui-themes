import ThemeEditor from '@/components/themeEditor/ThemeEditor';

interface pageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: pageProps) => {
  const id = (await params).id;
  return (
    <div>
      <ThemeEditor id={id} />
    </div>
  );
};

export default page;
