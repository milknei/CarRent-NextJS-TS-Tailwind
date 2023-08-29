'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Image from 'next/image';
import { SearchManufacturer } from '@/components';
import { manufacturers } from '@/constants';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40} className="object-contain" />
  </button>
);

const SearchBar = ({ setIsLoading }: any) => {
  const searchParams = useSearchParams();
  const currentManufacturerValue = searchParams.get('manufacturer');
  const currentManufacturer = manufacturers.find((m) => currentManufacturerValue === m.toLowerCase()) || '';
  const currentModel = searchParams.get('model') || '';

  const [manufacturer, setManufacturer] = useState(currentManufacturer);
  const [model, setModel] = useState(currentModel);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) searchParams.set('model', model);
    else searchParams.delete('model');

    if (manufacturer) searchParams.set('manufacturer', manufacturer);
    else searchParams.delete('manufacturer');

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathName, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
        <SearchButton otherClasses="md:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="model icon"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="md:hidden" />
      </div>
      <SearchButton otherClasses="max-md:hidden" />
    </form>
  );
};

export default SearchBar;
