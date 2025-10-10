'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "搜索Web3项目..." 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative">
      <div className={`
        relative flex items-center bg-white border-2 rounded-2xl transition-all duration-300 shadow-lg
        ${isFocused 
          ? 'border-blue-500 shadow-2xl ring-4 ring-blue-100 transform scale-105' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
        }
      `}>
        <Search className={`absolute left-5 w-6 h-6 transition-colors ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-14 pr-14 py-5 text-lg rounded-2xl focus:outline-none text-gray-900 placeholder-gray-500 bg-transparent"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-5 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      {/* 搜索建议（可选） */}
      {isFocused && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2 text-sm text-gray-600">
            搜索 "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
}