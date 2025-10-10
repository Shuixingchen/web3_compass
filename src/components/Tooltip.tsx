'use client';

import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface TooltipProps {
  content: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function Tooltip({ content, children, disabled = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50">
          <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
            {content}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}