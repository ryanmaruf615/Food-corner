/* eslint-disable @typescript-eslint/no-explicit-any */

export const uploadImageToCloudinary = async (file: any) => {
  try {
    if (!file) throw new Error("No file provided");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_PRESET as string);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDNAME as string);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDNAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Image upload failed");

    const data = await response.json();
    return data?.secure_url || null;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
