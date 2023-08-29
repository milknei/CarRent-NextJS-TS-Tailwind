'use client';

import { CarProps } from '@/types';

import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { generateCarImageUrl } from '@/utils';
import { CustomButton, ImageBox } from '@/components';

interface CarDetailsProps {
  isOpenDetails: boolean;
  closeModal: () => void;
  bookCar: () => void;
  car: CarProps;
  carRent: string;
}

const CarDetails = ({ isOpenDetails, closeModal, car, bookCar, carRent }: CarDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpenDetails} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto transform rounded-2xl bg-white text-left shadow-xl transition-all flex flex-col gap-5 p-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image src="close.svg" alt="close" width={20} height={20} className="object-contain" />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    {/* <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain" />
                    </div> */}
                    <ImageBox
                      imageUrl={generateCarImageUrl(car)}
                      customStyles="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg"
                    />

                    <div className="flex gap-3">
                      <ImageBox imageUrl={generateCarImageUrl(car, '29')} customImageStyles="flex-1" />
                      <ImageBox imageUrl={generateCarImageUrl(car, '33')} customImageStyles="!top-[18px] flex-1" />
                      <ImageBox imageUrl={generateCarImageUrl(car, '13')} customImageStyles="flex-1" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model} — <span className="font-normal text-sm align-top">$</span>
                      {carRent}
                      <span className="font-normal text-sm align-bottom">/day</span>
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div className="flex justify-between gap-5 w-full text-right" key={key}>
                          <h4 className="text-grey capitalize">{key.replace('_', ' ')}</h4>
                          <p className="text-black-100 font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <CustomButton
                    title="Book"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={bookCar}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
