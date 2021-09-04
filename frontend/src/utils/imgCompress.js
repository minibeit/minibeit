import imageCompression from "browser-image-compression";

export const handleCompressImg = async (img) => {
  const options = {
    maxSizeMB: 10,
  };
  return await imageCompression(img, options)
    .then((res) => {
      const file = new File([res], `${res.name}`);
      return file;
    })
    .catch((err) => {
      console.log(err);
    });
};
