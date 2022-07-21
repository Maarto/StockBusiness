import axios from "axios";

function useAxios(method, data, url) {
  return axios({
    method: method,
    url: `localhost:4000/${url}`,
    data: data
  });
}

export default useAxios;