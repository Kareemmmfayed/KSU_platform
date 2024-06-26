export const Upload = async (URL, file, fileType) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": fileType,
  };

  let response = await fetch(`${URL}`, {
    method: "PUT",
    body: file["0"],
    headers: headersList,
  });

  return response.ok;
};
