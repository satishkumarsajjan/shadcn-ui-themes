interface ChartsGridProps {
  title: string;
  Components: React.ReactNode[];
  Additional?: React.ReactNode;
}

const ChartsGrid = ({ Components, title, Additional }: ChartsGridProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <span className='flex items-center justify-center my-4'>
        <h2 className='text-2xl font-semibold text-foreground'>{title}</h2>
      </span>
      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
        }}
      >
        {Components.map((Component, index) => (
          <div key={index} className='w-full'>
            {Component}
          </div>
        ))}
      </div>
      {Additional}
    </div>
  );
};

export default ChartsGrid;
