import { ContentTitle } from "../components/ContentTitle.js";
import { PERSONAL_PROFILE_KEY } from "../constants/key.js";
import { localStorage } from "../utils/localStorage.js";
import { $ } from "../utils/selector.js";

const SignupPage = () => {
  const contentDom = $("#page_content");

  const formDom = $.create("form");
  formDom.id = "signup_form";
  formDom.innerHTML = `
    <span class="form_elem">
        <label for="name">
            이름
            <span class="mark">(필수*)</span>
        </label>
        <input id="name" name="name" placeholder="이름" required />
    </span>
    <span class="form_elem">
        <label for="email">
            이메일
            <span class="mark">(필수*)</span>
        </label>
        <input id="email" name="email" placeholder="이메일" required value="melanc@naver.com"/>
    </span>
    <span class="form_elem">
        <label for="nickname">
            닉네임
            <span class="mark">(필수*)</span>
        </label>
        <input id="nickname" name="nickname" placeholder="닉네임" required value="우량아" />
    </span>
    <span class="form_elem">
        <label for="role">
            직군
            <span class="mark">(필수*)</span>
        </label>
        <select id="role" name="role" required>
            
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="fullstack">풀스택</option>
        </select>
    </span>
    <span class="form_elem">
        <select id="mbti" name="mbti">
            <option value="">MBTI를 선택해주세요</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFJ">ISFJ</option>
            <option value="INFJ">INFJ</option>
            <option value="INTJ">INTJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISFP">ISFP</option>
            <option value="INFP">INFP</option>
            <option value="INTP">INTP</option>
            <option value="ESTP">ESTP</option>
            <option value="ESFP">ESFP</option>
            <option value="ENFP">ENFP</option>
            <option value="ENTP">ENTP</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ENTJ">ENTJ</option>  
        </select>
    </span>
    <span class="form_elem">
        <button type="submit">등록</button>
    </span>
  `;

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
