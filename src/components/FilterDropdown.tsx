'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
  placeholder = "选择..."
}: FilterDropdownProps) {
  const selectedOption = options.find(option => option.id === selected);

  return (
    <div className="relative min-w-[140px]">
      <Listbox value={selected} onChange={onSelect}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2.5 px-3 text-left border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  {label}:
                </span>
                <span className="text-sm text-gray-900 font-medium">
                  {selectedOption ? selectedOption.name : placeholder}
                </span>
              </div>
              <ChevronDown
                className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0"
                aria-hidden="true"
              />
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-xl border border-gray-100 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer select-none py-3 pl-10 pr-4 mx-2 rounded-lg transition-colors',
                      active ? 'bg-blue-50 text-blue-900' : 'text-gray-900 hover:bg-gray-50'
                    )
                  }
                  value={option.id}
                >
                  {({ selected: isSelected }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <span
                          className={clsx(
                            'block truncate',
                            isSelected ? 'font-semibold text-blue-600' : 'font-normal'
                          )}
                        >
                          {option.name}
                        </span>
                        {option.count !== undefined && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {option.count}
                          </span>
                        )}
                      </div>
                      {isSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}