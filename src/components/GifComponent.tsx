import { Link } from "react-router-dom";

export default function GifComponent({
  id,
  url,
  children,
}: {
  id: string;
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative aspect-w-1 aspect-h-1 mb-8 animate__fadeIn">
      <Link to={`/gif/${id}`}>
        <img
          src={url}
          alt={id}
          className="object-cover w-full h-full rounded"
        />
      </Link>
      {children}
    </div>
  );
}
