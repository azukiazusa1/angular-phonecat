import React from 'react';
import { PhoneDetail } from './types';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  phone: PhoneDetail;
  mainImageUrl: string;
  setImage: (imageUrl: string) => void;
};

const PhoneImages: React.FC<Props> = ({ phone, mainImageUrl, setImage }) => {
  return (
    <>
      <div className="phone-images">
        <AnimatePresence initial={false}>
          <motion.img
            src={mainImageUrl}
            key={mainImageUrl}
            className="phone selected"
            data-testid="main-image"
            transition={{ duration: 0.5 }}
            style={{ display: 'block', position: 'absolute', top: 500, left: 0 }}
            animate={{ top: 0 }}
            exit={{
              top: -500
            }}
          />
        </AnimatePresence>
      </div>

      <h1>{phone.name}</h1>

      <p>{phone.description}</p>

      <ul className="phone-thumbs">
        {phone.images.map((image) => (
          <li key={image}>
            <img key={image} src={image} onClick={() => setImage(image)} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PhoneImages;
