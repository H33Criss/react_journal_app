export const fileUpload = async (file: File) => {
  if (!file) throw new Error("Sin archivo para subir");

  const cloudURL = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUD_NAME
  }/upload`;
  const formData = new FormData();
  formData.append("upload_preset", import.meta.env.VITE_PRESET_NAME);
  formData.append("file", file);

  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pude subir imagen");
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
