import axios from "axios";

export const _fetchCrimeById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:5001/crimes/${id}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching crime data:", err);
    return null;
  }
};