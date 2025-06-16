const ErrorMessage = ({
  message = 'Something went wrong. Please try again later.',
  backgroundColor = 'transparent',
  height = '100vh',
}: {
  message?: string;
  height?: string;
  backgroundColor?: string;
}) => {
  return (
    <div
      style={{ height, backgroundColor }}
      className="flex flex-col justify-center items-center text-center"
    >
      <p className="text-xl mt-5 font-bold">{message}</p>
    </div>
  );
};

export default ErrorMessage;
