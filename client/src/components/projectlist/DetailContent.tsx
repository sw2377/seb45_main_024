import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { getTokensFromLocalStorage } from "../../utils/tokenStorage";
import { getStringDate } from "../../utils/formatDate";
import { extractTextAfterColon } from "../../utils/exceptColonFromTechResponse";
import defaultProfile from "../../assets/images/default_profile.svg";

import { getProject } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./DetailContent.module.css";
import "./QuillEditor.css";
import GetLogo from "../mypage/format/GetLogo";

interface AccessTokenType {
  id: number;
}

const DetailContent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams() as { projectId: string };

  const token = getTokensFromLocalStorage() as AccessTokenType;
  let tokenId: number | undefined;

  if (token) {
    tokenId = token.id;
  }

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(state => state.projects.currentData);

  const {
    title,
    content = "",
    writerId = 0,
    writerNickName,
    writerImageURL,
    techTagList,
    startDate = "",
    endDate = "",
    position,
    createdAt = "",
  } = currentProject || {};

  const goToUserMyPage = (writerId: number) => {
    if (token) {
      navigate(`/mypage/${writerId}`);
    } else {
      alert("회원만 다른 유저의 프로필을 조회할 수 있어요!");
      navigate("/login");
    }
  };

  // Format Date
  const createdDate = getStringDate(createdAt);

  const startDateString = getStringDate(startDate);
  const endDateString = getStringDate(endDate);

  const techTagNames = extractTextAfterColon(techTagList);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  /* Get Project */
  useEffect(() => {
    // console.log("🚀 GET PROJECT");
    setIsLoading(true);
    setError(null);

    dispatch(getProject(projectId))
      .unwrap()
      .catch(err => {
        console.warn("🚀 GET PROJECT ERROR", err.message);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, projectId]);

  return (
    <section className={classes.detail}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60vh",
          }}
        >
          Loading...
        </div>
      ) : (
        <>
          <h2>{title}</h2>
          <div className={classes.meta}>
            <div
              className={classes.userImage}
              onClick={() => goToUserMyPage(writerId)}
            >
              <img src={writerImageURL || defaultProfile} alt="" />
            </div>
            <div className={classes.username}>{writerNickName}</div>
            <div className={classes.date}>{createdDate}</div>
            {tokenId === writerId ? (
              <div
                className={classes.edit}
                onClick={() => {
                  navigate(`/projectlist/edit/${projectId}`);
                }}
              >
                <EditSvg width="16" height="16" />
              </div>
            ) : null}
          </div>
          <div className={classes.detailInfo}>
            <dl>
              <dt>프로젝트 예상기간</dt>
              <dd>
                {startDateString} ~ {endDateString}
              </dd>
            </dl>
            <dl>
              <dt>포지션 및 인원</dt>
              <dd>{position}</dd>
            </dl>
            <dl>
              <dt>기술 스택</dt>
              <dd>
                <ul className={classes.techTags}>
                  {techTagNames?.map(techName => {
                    return (
                      <li key={techName} className={classes.techTag}>
                        <GetLogo logoTitle={techName} />
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </dl>
          </div>
          <div className={classes.description}>
            <h3>프로젝트 소개</h3>
            {/* 임시 error */}
            {error ? (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--color-state-error)",
                  fontWeight: "bold",
                }}
              >
                {`[${error}] dummy data를 사용합니다.`}
              </div>
            ) : null}
            <div
              className="quillEditor quillEditor_view"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          {tokenId === writerId ? (
            <div className={classes.completeBtn}>
              <button>팀원모집완료</button>
              <p>
                팀원 모집이 완료되었다면, 버튼을 클릭하여 모집 상태를 변경해
                주세요!
              </p>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};

export default DetailContent;
