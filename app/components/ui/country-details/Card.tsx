type CardProps = {
  label: string;
  value: string;
  imgSrc?: string;
  imgAlt?: string;
};

export default function Card({ label, value, imgSrc, imgAlt }: CardProps) {
  return (
    <div
      className={`rounded-[20px] bg-white p-6 font-assistant ${imgSrc ? 'h-[200px] md:h-[300px] lg:row-span-2 lg:h-full' : ''}`}
    >
      <label className='mb-8 text-light-gray'>{label}</label>
      {imgSrc && imgAlt && (
        <img
          src={imgSrc}
          alt={imgAlt}
          className='mx-auto mt-8 h-[calc(100%-4rem)] max-h-[170px] w-full max-w-[255px] rounded-2xl object-cover'
        />
      )}
      {value && <p className='text-[32px] text-navy-blue'>{value}</p>}
    </div>
  );
}
