import { ContentTitle } from "../components/ContentTitle.js";
import { PERSONAL_PROFILE_KEY } from "../constants/key.js";
import { localStorage } from "../utils/localStorage.js";
import { $ } from "../utils/selector.js";

const SIGNUP_FORM_INPUT_OPTIONS = {
  name: {
    key: "name",
    label: "이름",
    type: "text",
    placeholder: "이름",
    required: true,
  },
  email: {
    key: "email",
    label: "이메일",
    type: "text",
    placeholder: "이메일",
    required: true,
  },
  nickname: {
    key: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임",
    required: true,
  },
  role: {
    key: "role",
    label: "직군",
    type: "select",
    required: true,
    options: [
      { value: "", text: "직군을 선택해주세요" },
      { value: "frontend", text: "프론트엔드" },
      { value: "backend", text: "백엔드" },
      { value: "fullstack", text: "풀스택" },
    ],
  },
  mbti: {
    key: "mbti",
    label: "MBTI",
    type: "select",
    options: [
      { value: "", text: "MBTI를 선택해주세요" },
      { value: "ISTJ", text: "ISTJ" },
      { value: "ISFJ", text: "ISFJ" },
      { value: "INFJ", text: "INFJ" },
      { value: "INTJ", text: "INTJ" },
      { value: "ISTP", text: "ISTP" },
      { value: "ISFP", text: "ISFP" },
      { value: "INFP", text: "INFP" },
      { value: "INTP", text: "INTP" },
      { value: "ESTP", text: "ESTP" },
      { value: "ESFP", text: "ESFP" },
      { value: "ENFP", text: "ENFP" },
      { value: "ENTP", text: "ENTP" },
      { value: "ESTJ", text: "ESTJ" },
      { value: "ESFJ", text: "ESFJ" },
      { value: "ENFJ", text: "ENFJ" },
      { value: "ENTJ", text: "ENTJ" },
    ],
  },
};

const SignupPage = () => {
  const contentDom = $("#page_content");

  const formDom = $.create("form");
  formDom.id = "signup_form";

  Object.entries(SIGNUP_FORM_INPUT_OPTIONS).forEach(([key, value]) => {
    let result = "";
    if (value.type === "text") {
      result = `
            <span class="form_elem">
            <label for="${value.key}">
                ${value.label}
                ${value.required ? '<span class="mark">(필수*)</span>' : ""}
            </label>
            <input id="${value.key}" name="${value.key}" placeholder="${
        value.placeholder
      }" required />
            </span>
        `;
    }
    if (value.type === "select") {
      result = `
            <span class="form_elem">
                <label for="${value.key}">
                    ${value.label}
                    ${value.required ? '<span class="mark">(필수*)</span>' : ""}
                </label>
                <select id="${value.key}" name="${value.key}" required>
                    ${value.options
                      .map(
                        (option) =>
                          `<option value="${option.value}">${option.text}</option>`
                      )
                      .join("")}
                </select>
            </span>
        `;
    }

    formDom.innerHTML += result;
  });

  contentDom.appendChild(ContentTitle({ title: "Signup Grate People!" }));
  contentDom.appendChild(formDom);

  formDom.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const userEmail = formValues.email;
    const userName = formValues.name;

    const localStoragePersonalInfo = localStorage.get("personalInfo");

    const 이메일_중복_여부 = localStoragePersonalInfo.some(
      (info) => info.email === userEmail
    );
    const 이름_중복_여부 = localStoragePersonalInfo.some(
      (info) => info.name === userName
    );

    if (이메일_중복_여부 || 이름_중복_여부) {
      alert("이메일 혹은 닉네임이 이미 등록되어 있습니다.");
      return;
    }

    localStorage.set(PERSONAL_PROFILE_KEY, [
      ...localStoragePersonalInfo,
      {
        idx: localStoragePersonalInfo.length,
        ...formValues,
      },
    ]);
    alert("성공적으로 등록되었습니다.");
  });
};

export default SignupPage;
