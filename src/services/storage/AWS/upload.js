export const Upload = async (URL, file) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/vnd.ms-excel",
  };

  let response = await fetch(`${URL}`, {
    method: "PUT",
    body: file["0"],
    headers: headersList,
  });

  return response.ok;
};
