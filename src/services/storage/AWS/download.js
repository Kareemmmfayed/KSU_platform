export const download = async (URL, fileType) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": fileType,
  };

  let response = await fetch(`${URL}`, {
    method: "GET",
    headers: headersList,
  });

  return response;
};
