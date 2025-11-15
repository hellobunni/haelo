interface DecorativeBlobsProps {
  blobs?: Array<{
    position?: string;
    horizontal?: string;
    size?: string;
    color: string;
  }>;
}

export const DecorativeBlobs = ({ blobs }: DecorativeBlobsProps) => {
  const defaultBlobs = [
    {
      position: "top-20",
      horizontal: "right-10",
      size: "w-72 h-72",
      color: "bg-resume-purple-2/10",
    },
    {
      position: "bottom-20",
      horizontal: "left-10",
      size: "w-96 h-96",
      color: "bg-resume-pink-3/10",
    },
  ];

  const blobConfig = blobs || defaultBlobs;

  return (
    <>
      {blobConfig.map((blob, index) => (
        <div
          key={`blob-${blob.position || ""}-${blob.horizontal || ""}-${blob.color}-${index}`}
          className={`absolute ${blob.position || ""} ${blob.horizontal || ""} ${blob.size || ""} ${blob.color} rounded-full blur-3xl`}
        />
      ))}
    </>
  );
};
