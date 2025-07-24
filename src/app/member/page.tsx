"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./member.module.scss";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchMember, updateMember } from "@/service/member";
import { Member } from "@/types/member";
import { useMemberContext } from "@/store/member";
export default function MemberDetail() {
  const [isEditMode, setIsEditMode] = useState(false);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<string>("");
  //todo1. store/member 로부터 member를 추출
  const { member } = useMemberContext();

  /*
   무한 re-rendering 
   id state를 "" 값으로 선언한 후 useMemberContext()로 부터 가져온 member정보로 
   id(state)를 변경 시키면 re-rendering 조건이 되서 다시 rendering된다. 
   ****함수형 컴포넌트이므로 함수 전체가 다시 수행되는데 이때 id를 setId로 다시 변경해서 
   무한 re-rendering된다. 
   if (member) setId(member.id);
*/

  //todo2. useEffect를 통해 member가 있는 경우 id 상태를 변경한다.
  useEffect(() => {
    if (member) setId(member.id);
  }, [member]);

  const {
    data: find,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["member", id],
    queryFn: () => searchMember(id),
  });

  useEffect(() => {
    if (!find) return;
    if (idRef.current) idRef.current.value = find.id;
    if (passwordRef.current) passwordRef.current.value = find.password;
    if (nameRef.current) nameRef.current.value = find.name;
    if (emailRef.current) emailRef.current.value = find.email || "";
    if (addressRef.current) addressRef.current.value = find.address || "";
    if (phoneRef.current) phoneRef.current.value = find.phone || "";
  }, [find]);
  const { mutate } = useMutation({
    mutationFn: updateMember,
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      console.error("수정실패:", error);
      alert(error);
    },
  });

  const handleUpdate = useCallback(async () => {
    if (isEditMode) {
      const id = idRef.current?.value.trim() || "";
      const password = passwordRef.current?.value.trim() || "";
      const name = nameRef.current?.value.trim() || "";
      if (!id) {
        alert("아이디를 입력하세요");
        idRef.current?.focus();
        return;
      }
      if (!password) {
        alert("비밀번호를 입력하세요");
        passwordRef.current?.focus();
        return;
      }
      if (!name) {
        alert("이름을 입력하세요");
        nameRef.current?.focus();
        return;
      }
      const member: Member = {
        id,
        password,
        name,
        email: emailRef.current?.value || "",
        address: addressRef.current?.value || "",
        phone: phoneRef.current?.value || "",
      };
      mutate(member);
    }
    setIsEditMode((prev) => !prev);
  }, [mutate]);
  if (isLoading) return <h1>Loading.....</h1>;
  if (error) return <h1>{(error as Error).message}</h1>;
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <caption>회원 가입</caption>
        <tbody>
          <tr>
            <td>아 이 디</td>
            <td>
              <input type="text" ref={idRef} readOnly />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input
                className={`${!isEditMode ? styles.readonly : styles.input}`}
                readOnly={!isEditMode}
                type="password"
                ref={passwordRef}
              />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input
                className={`${!isEditMode ? styles.readonly : styles.input}`}
                readOnly={!isEditMode}
                type="text"
                ref={nameRef}
              />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input
                className={`${!isEditMode ? styles.readonly : styles.input}`}
                readOnly={!isEditMode}
                type="email"
                ref={emailRef}
              />
            </td>
          </tr>
          <tr>
            <td>주소</td>
            <td>
              <input
                className={`${!isEditMode ? styles.readonly : styles.input}`}
                readOnly={!isEditMode}
                type="text"
                ref={addressRef}
              />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                className={`${!isEditMode ? styles.readonly : styles.input}`}
                readOnly={!isEditMode}
                type="text"
                ref={phoneRef}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonGroup}>
        <button className={styles.registerButton} onClick={handleUpdate}>
          수정
        </button>
      </div>
    </div>
  );
}
