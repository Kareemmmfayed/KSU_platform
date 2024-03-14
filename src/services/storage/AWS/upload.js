export const Upload = async (URL, file) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/vnd.ms-excel",
  };

  const formData = new FormData();
  formData.append("file", file);

  let response = await fetch(`${URL}`, {
    method: "PUT",
    body: formData,
    headers: headersList,
  });

  return response;
};
