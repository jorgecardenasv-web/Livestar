'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { SuccessStoryCard } from './success-story-card';
import { StaticImageData } from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  items: Array<{
    text: string;
    image: StaticImageData;
  }>;
}

export const SuccessCardCarousel = ({ items }: CarouselProps) => {
  return (
    <div className="relative w-full max-w-80 mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={false}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center py-3">
              <SuccessStoryCard {...item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}