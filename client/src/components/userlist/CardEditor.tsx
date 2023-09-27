import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Hashtag } from "../../assets/icons/hashtag.svg";
import { UserListDataType } from "../../model/boardTypes";
import Card from "../../components/userlist,projectlist/card/Card";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Tag from "../userlist,projectlist/Tag";
import { getTokensFromLocalStorage } from "../../utils/tokenStorage";
import { extractNumbersBeforeColon } from "../../utils/exceptColonFromTechResponse";
import { TechTagTypes } from "../../model/techTagTypes";

import { addUserCard } from "../../redux/store";
import { editUserCard } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./CardEditor.module.css";

// 임시
import authInstance from "../../utils/authInstance";
import dummyData from "../../dummy-data.json";
import GetLogo from "../mypage/format/GetLogo";

interface CardEditorProps {
  originCard?: UserListDataType;
}

interface AccessTokenType {
  id: number;
}

// originCard가 없으면 생성, originCard가 있으면 수정
const CardEditor = ({ originCard }: CardEditorProps) => {
  console.log("✅ ORIGIN CARD", originCard);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const editTitle = useAppSelector(state => state.users.editTitle);
  const [newTitle, setNewTitle] = useState(editTitle);

  // const [newTitle, setNewTitle] = useState(originCard?.title);

  useEffect(() => {
    setNewTitle(editTitle);
  }, [editTitle]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | string>(null);

  // 나의 기술스택 조회
  const token = getTokensFromLocalStorage() as AccessTokenType;
  let tokenId: number;

  const [myTechTags, setMyTechTags] = useState<TechTagTypes[]>([]);

  if (token) {
    tokenId = token.id;
  }

  useEffect(() => {
    getMyTechTags();
  }, []);

  const getMyTechTags = async () => {
    try {
      // throw new Error();

      const response = await authInstance.get(`/mypages/profile/${tokenId}`);
      const techData = await response.data.techTags; // [{…}, {…}, {…}, {…}, {…}, {…}, {…}]

      setMyTechTags(techData);
    } catch (error) {
      // 서버 연결 안되었을 경우 더미데이터 노출
      console.warn(error);

      const techData = dummyData.mypages.techTags as TechTagTypes[];

      setMyTechTags(techData);
    }
  };

  /** 포함되어야 할 정보 : 날짜, 제목, 포지션, 기술스택, 태그 */
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("포지션");

  const [techTagsId, setTechTagsId] = useState<number[]>([]);

  // 지원포지션
  const positionList = ["프론트엔드", "백엔드"];

  const handlePositionSelect = (selected: string) => {
    setPosition(selected);
  };

  // 기술스택 선택
  const onSelectTechTags = (selectedId: number) => {
    // console.log(selectedId);

    const isSelected = techTagsId.includes(selectedId);
    // console.log("isSelected", isSelected);

    if (isSelected) {
      // 선택된 태그일 경우
      const updatedTechTags = techTagsId.filter(id => id !== selectedId);
      setTechTagsId(updatedTechTags);
    } else {
      // 선택되지 않은 태그일 경우
      setTechTagsId(prev => [...prev, selectedId]);
    }
  };

  // 키워드 예시
  const [keywords, setKeywords] = useState<string[]>([]);

  // 키워드 추가
  const onCreateTag = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X

    // 같은 키워드 추가 금지
    if (!keywords.includes(trimKeyword)) {
      setKeywords(prev => {
        return [...prev, trimKeyword];
      });
    }
  };

  // 키워드 삭제
  const handleDelete = (targetKeyword: string) => {
    const updatedKeyword = keywords.filter(
      keyword => keyword !== targetKeyword,
    );
    setKeywords(updatedKeyword);
  };

  /** EDIT CARD인 경우
   *  originCard에서 title, position, keywords, techTagList를 가져옴
   *  화면이 처음 렌더링될때, CardData를 세팅하고 Card 컴포넌트로 넘김
   */

  useEffect(() => {
    if (originCard) {
      setDate(originCard?.createdAt);
      setNewTitle(originCard?.title);
      setPosition(originCard?.position);
      setKeywords(originCard?.keywords);
      setTechTagsId(extractNumbersBeforeColon(originCard?.techTagList));

      // setTitle(newTitle);
    }
  }, [originCard]);

  // 수정일 경우 origin 데이터를 set하고, cardData를 props로 넘김
  // 생성일 경우 빈 값이 담긴 cardData를 card 컴포넌트로 넘김
  const cardData: UserListDataType = {
    title: newTitle,
    position: position,
    keywords: keywords,
    createdAt: date,
    techTagList: techTagsId,
  };

  const reqData = {
    title: newTitle, // "제목형식string"
    // title: title, // "제목형식string"
    position: position, // "포지션형식string"
    keywords: keywords, // ["키워드1", "키워드2"]
    techTagIdList: techTagsId, // [1,3,5]
  };

  // 모든 입력값에 대한 유효성 체크
  const checkValidData = () => {
    const checkTitle = newTitle?.trim().length === 0;
    const checkPosition = position.trim().length === 0 || position === "포지션";
    const checkKeywords = keywords.length === 0;
    const checkTechTags = techTagsId.length === 0;

    if (checkTitle || checkPosition || checkKeywords || checkTechTags) {
      return false;
    }

    return true;
  };

  /* Creact or Edit Card */
  const handleSubmit = () => {
    console.log("🚀 CREATE/EDIT CARD", reqData);
    console.log("🚀 EDITED_TITLE", newTitle);

    // 모든 필드가 채워진 상태일 경우에만 생성/수정 가능
    if (!checkValidData()) {
      alert("입력값을 모두 채워주세요.");
      return;
    }

    if (
      window.confirm(
        originCard
          ? "카드를 수정하시겠습니까?"
          : "새로운 카드를 작성하시겠습니까?",
      )
    ) {
      if (!originCard) {
        // setIsLoading(true);
        // setError(null);

        dispatch(addUserCard(reqData))
          .unwrap()
          .then(() => {
            // console.log("🚀 CREATE 성공", reqData);
            window.alert("새 글이 등록되었습니다.");
            navigate("/userlist");
          })
          .catch(error => {
            console.warn("🚀 CREATE 실패", error, reqData);
            // setError("Something went wrong");
          });
        // .finally(() => setIsLoading(false));
      }

      if (originCard) {
        // setIsLoading(true);
        // setError(null);

        const targetId = originCard?.teamBoardId;

        dispatch(editUserCard({ targetId, reqData }))
          .unwrap()
          .then(() => {
            // console.log("🚀 EDIT 성공", reqData);
            window.alert("카드가 수정되었습니다.");
            navigate("/userlist");
          })
          .catch(error => {
            alert("제목을 수정해주세요!");
            console.warn("🚀 EDIT 실패", error, reqData);
          });
      }
    }
  };

  return (
    <main>
      <div className={classes.previewArea}>
        <ul className={classes.editCardFrontAndBack}>
          <Card type="USER_CARD" cardData={cardData} isEdit={true} />
          <Card type="USER_CARD" cardData={cardData} isEdit={true} />
        </ul>
      </div>
      <div className={classes.inputArea}>
        <div className={classes.inputAreaTop}>
          <Selectbox
            title={position}
            options={positionList}
            selectedOption={position}
            onSelect={handlePositionSelect}
            borderRadius={4}
            width={150}
          />
        </div>
        <div className={classes.inputAreaBottom}>
          <section className={classes.techTagsSection}>
            <h2 className={classes.title}>프로젝트에서 사용할 기술 스택</h2>
            {/* TODO:: 기술스택 변경 안내문구 */}
            <ul className={classes.techTags}>
              {myTechTags.length > 0 ? (
                <>
                  {myTechTags.map(techData => (
                    <li
                      key={techData.id}
                      onClick={() => onSelectTechTags(techData.id)}
                      className={
                        techTagsId.includes(techData.id)
                          ? `${classes.selected}`
                          : ""
                      }
                    >
                      <GetLogo logoTitle={techData.techName} />
                    </li>
                  ))}
                </>
              ) : (
                <>
                  <li className={classes.TechTagInfoText}>
                    😮 현재 추가되어있는 기술스택이 없습니다.
                  </li>
                  <li className={classes.TechTagInfoText}>
                    마이페이지에서 내가 사용할 수 있는 기술스택을 추가해 주세요!
                  </li>
                  <li
                    className={classes.TechTagInfoText}
                    onClick={() =>
                      navigate(`/mypage/${tokenId}`, { replace: true })
                    }
                  >
                    마이페이지로 바로가기 &gt;
                  </li>
                </>
              )}
            </ul>
          </section>
          <section className={classes.keywordSection}>
            <h2 className={classes.title}>내가 원하는 프로젝트의 키워드</h2>
            <SearchInput
              placeholder="Enter를 눌러 키워드를 추가해 보세요!"
              onSubmit={keyword => onCreateTag(keyword)}
            >
              <Hashtag stroke="var(--color-gray-4)" />
            </SearchInput>
            <ul>
              {keywords.map(list => (
                <Tag
                  key={list}
                  type="KEYWORD_TAG"
                  text={list}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className={classes.buttonArea}>
        <ActionButton
          type="outline"
          handleClick={() => {
            navigate("/userlist");
          }}
        >
          취소
        </ActionButton>
        <ActionButton handleClick={handleSubmit}>
          {originCard ? "카드 수정하기" : "카드 등록하기"}
        </ActionButton>
      </div>
    </main>
  );
};

export default CardEditor;
