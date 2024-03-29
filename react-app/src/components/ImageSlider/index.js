import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import './ImageSlider.css';

const ImageSlider = ({ images, listing }) => {
  const [current, setCurrent] = useState(0);
  const length = images?.length;

  if (!Array.isArray(images) || images?.length <= 0) return null;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <div className='slider search_results-slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {images?.map((img, i) => (
        <div className={i === current ? 'slide-active' : 'slide'} key={i}>
          {i === current && (
            <Link to={`/listings/view/${listing.title}/${listing.id}`}>
              <img src={img.img_url} alt='' className='listing-image' />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
