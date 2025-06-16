import { ReactNode, Suspense } from 'react';

import Loading from '../../Loading';
import ErrorBoundary from '../ErrorBoundary';

const ErrorFallback = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorFallback;
