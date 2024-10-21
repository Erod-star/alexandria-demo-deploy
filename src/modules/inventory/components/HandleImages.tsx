import { ImageOff } from 'lucide-react';

interface HandleImagesProps {
  images: string[];
}

export const HandleImages = (props: HandleImagesProps) => {
  const { images } = props;
  const visibleImages = images.slice(1, 3);

  return (
    <div className="flex-center flex-col gap-2 text-black">
      <div className=" size-20 rounded-md bg-gray-400 text-xs flex-center ">
        {images.length > 0 ? (
          <button>
            <img
              className="size-full object-cover rounded-md"
              src={images[0]}
            />
          </button>
        ) : (
          <div className="size-full p-3">
            <ImageOff className="size-full" />
          </div>
        )}
      </div>
      <div className="flex gap-1">
        {visibleImages.map((image, index) => {
          console.log(visibleImages);
          return (
            <div
              className="size-6 rounded-md bg-gray-400 text-xs flex-center"
              key={index}
            >
              <button>
                <img className="size-6 rounded-md" src={image} />
              </button>
            </div>
          );
        })}
        {images.length > 3 ? (
          <div className="size-6 rounded-md bg-gray-400 text-xs flex-center">
            <button> + {images.length - 3}</button>{' '}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
