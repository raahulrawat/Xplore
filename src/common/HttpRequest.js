import axios from "axios"

const AxiosInstance = axios.create({
  baseURL:""
});


export const GET_REQUEST = (url) => {
  return AxiosInstance({
    method: "get",
    url: url,
  });
};
export const POST_REQUEST = (url, data, headers) => {
  return AxiosInstance({
    method: "post",
    url,
    data,
    headers,
  });
};
export const PATCH_REQUEST = (url,data) =>{
   return AxiosInstance({
    method:"patch",
    url,
    data
   })
}
export const DELETE_REQUEST = (url) => {
  return AxiosInstance({
    method: "delete",
    url,
  });
};

export const PUT_REQUEST = (url, data, isImage = false,headers) => {
  if (isImage) {
    headers['Content-Type'] = 'multipart/form-data';
    return AxiosInstance({
      method: "put",
      url,
    data,
    });
  }
  return AxiosInstance({
    method: "put",
    url,
    data,
    headers,
  });
};
