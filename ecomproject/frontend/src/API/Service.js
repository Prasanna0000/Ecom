import { Client } from "./Client";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

export async function GetUserdata() {
  let config = {
    url: `${BASE_URL}userdata`,
    headers: {
      "content-type": "application/json",
    },
    method: "get",
  };
  let res = await axios(config);
  return res;
}

export async function PostDetails(data) {
  let config = {
    url: `${BASE_URL}postdetails`,
    headers: {
      "content-type": "application/json",
    },
    method: "post",
  };
  let res = await Client(config, data);
  return res;
}

export async function PostTheDetails(data) {
  let config = {
    url: `${BASE_URL}postuserdata`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
    method: "post",
  };
  let res = await axios(config);
  return res;
}

export async function PostLoginLogDetails(data) {
  let config = {
    url: `${BASE_URL}userlogdetails`,
    headers: {
      "content-type": "application/json",
    },
    method: "post",
  };
  let res = await Client(config, data);
  return res;
}

// Rest of your code...

/*Profile service function */

export async function Getprofiledatabyid(id) {
  try {
    const response = await axios.get(`${BASE_URL}profiledatabyid/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data", error);
  }
}

export async function postTheProfileData(data) {
  try {
    const req = await axios.post(`${BASE_URL}profiledata`, data);
  } catch (error) {
    throw new Error("Failed to create profile data :" + error);
  }
}

export async function updateProfileDataById(id, data) {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateprofiledatabyid/${id}`, // Replace with the correct endpoint for updating profile data
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    throw new Error("Failed to update profile data", error);
  }
}

export const Getprofiledata = async () => {
  const response = await axios.get(`${BASE_URL}/profiledata`);
  return response.data;
};

export const Deleteprofiledata = async (id) => {
  await axios.delete(`${BASE_URL}/profiledatadelete/${id}`);
};

// to post the order using the react query
/*Profile service function */
export const PostorderdetailsData = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/orderproductdetails`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post invoice data");
  }
};
