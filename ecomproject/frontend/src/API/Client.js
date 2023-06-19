import axios from "axios";

export async function Client(header, body = {}) {

  let config = {
    ...header,
    data: body,
  };

  let res = await axios(config);
  return res;
}
