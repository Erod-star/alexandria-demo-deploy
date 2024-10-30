// ? Icons
import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex gap-2 text-alt-green-300">
      {rating > 0 ? (
        <>
          <Star fill="#AAFFE3" />
          <Star fill="#AAFFE3" />
          <Star fill="#AAFFE3" />
          <Star fill="#AAFFE3" />
          <StarHalf fill="#AAFFE3" />
        </>
      ) : (
        <span>Sin calificación</span>
      )}
    </div>
  );
};
