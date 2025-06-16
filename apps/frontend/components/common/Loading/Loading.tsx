import { LoaderCircle } from 'lucide-react';

const Loading = ({
  backgroundColor = 'transparent',
  height = '100vh',
}: {
  height?: string;
  backgroundColor?: string;
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center text-center"
      style={{ height, backgroundColor }}
    >
      <LoaderCircle className="animate-spin w-12 h-12 text-blue-500" />
      <p className="mt-5 text-xl font-bold">Loading...</p>
    </div>
  );
};

export default Loading;
