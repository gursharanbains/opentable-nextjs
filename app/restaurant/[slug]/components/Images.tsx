interface IProps {
  images: string[];
}

export default function Images({ images }: IProps) {
  return (
    <div className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
      <h1>
        {images.length} {images.length != 1 ? "photos" : "photo"}
      </h1>
      <div className="flex flex-wrap">
        {images.map((img) => (
          <img src={img} className="w-56 h-44 mr-1 mb-1" alt="" />
        ))}
      </div>
    </div>
  );
}
