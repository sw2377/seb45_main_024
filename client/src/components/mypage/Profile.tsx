import { FC } from "react";
import CreateProfile from "./CreateProfile";
import classes from "./Profile.module.css";
import NoContent from "./NoContent";
import editicon from "../../assets/icons/edit.svg";
import Bio from "./Bio";
import TitleLine from "./TitleLine";
import ProfileCats from "./ProfileCats";

// 컴포넌트 구분 없이 작업 후 분리 예정

const Profile: FC = () => {
  // api get 요청으로 프로필 정보 받아오기: bio는 Bio 컴포넌트로 props 전달 // 미리보기에서 사용해야 함. 툴킷으로 bio 관리.
  const dummyBio =
    "국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 종교의 자유를 가진다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다.";
  // const dummyBio = "";

  // 기술 설명은 gpt랑 deepl api 사용?

  return (
    <>
      <div className={classes.editContainer}>
        <img className={classes.editButton} src={editicon} alt="edit icon" />
      </div>
      <div className={classes.profileItemsContainer}>
        <section className={classes.profileItem}>
          <TitleLine title={ProfileCats.BIO} />
          {/* 조건부 렌더링 */}
          {dummyBio.length > 0 ? <Bio bio={dummyBio} /> : <NoContent />}
        </section>
        <section>
          <TitleLine title={ProfileCats.TECH} />
          <div>{/* 조건부 */}</div>
          <div>
            <h2>언어</h2>
            <p>설명</p>
          </div>
        </section>
        <section>
          <TitleLine title={ProfileCats.HARD} />
          <div>{/* 조건부 */}</div>
        </section>
        <section>
          <TitleLine title={ProfileCats.SOFT} />
          <div>{/* 조건부 */}</div>
        </section>
        <section>
          <TitleLine title={ProfileCats.PROJ} />
          <div>{/* 조건부 */}</div>
        </section>
      </div>
      <h1 style={{ marginTop: "6rem" }}>Edit 눌렀을 때</h1>
      <CreateProfile />
    </>
  );
};

export default Profile;
