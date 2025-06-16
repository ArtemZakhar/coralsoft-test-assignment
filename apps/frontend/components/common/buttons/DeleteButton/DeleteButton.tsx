'use client';

import { ComponentProps, ReactNode } from 'react';
import { useTransition } from 'react';

const DeleteButton = ({
  onClick,
  children,
  ...props
}: ComponentProps<'button'> & { onClick: (data?: any) => Promise<void>; children: ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      try {
        await onClick();
      } catch (error) {
        console.error('Failed to delete:', error);
        alert('Failed to delete the recipe. Please try again.');
      }
    });
  };

  return (
    <button onClick={handleClick} className="btn btn-secondary" disabled={isPending} {...props}>
      {isPending ? 'Deleting...' : children}
    </button>
  );
};

export default DeleteButton;
