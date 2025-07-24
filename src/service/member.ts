import { Member } from "@/types/member";
import { localAxios } from "@/utils/http-commons";

export const searchMember = async (id: string): Promise<Member> => {
  const axios = localAxios();
  const { data } = await axios.get(`/member/${id}`);
  return data;
};

export const updateMember = async (member: Member): Promise<Member> => {
  const axios = localAxios();
  const { data } = await axios.put("/member", member);
  return data;
};
export const registMember = async (member: Member): Promise<Member> => {
  const axios = localAxios();
  const { data } = await axios.post("/member", member);
  return data;
};
export const removeMember = async (id: string): Promise<Member> => {
  const axios = localAxios();
  const { data } = await axios.delete(`/member/${id}`);
  return data;
};
