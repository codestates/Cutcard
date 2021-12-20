import React, { useState } from "react";
import { Input, EmailInput, Notification } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Link } from "react-router-dom";
import { CardSelect, Select } from "../components/Select";
import CardList from "../components/CardList";
import { FlexContainer } from "../components/Common";

function SignUpPage({ cardsList }) {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [cards, setCards] = useState(cardsList);
  const [userCardList, setUserCardList] = useState([]);
  const [selected, setSelected] = useState("");
  const [wantCut, setWantCut] = useState(false);

  const onEmailChange = (e) => {
    const emailValidator =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const result = emailValidator.test(e.target.value);
    setIsEmail(result);
    setEmail(e.target.value);
  };

  const onEmailFocus = () => {
    setEmailFocused(true);
  };

  const emailExistsCheck = () => {
    setEmailExists(!emailExists);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordChangeCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onCardChange = (e) => {
    setSelected(e.target.value);
    const newCards = cards.filter((obj) => e.target.value !== obj.name);
    setCards(newCards);
    const selectedData = cards.filter((obj) => obj.name === e.target.value);
    const newUserCardList = userCardList.concat(selectedData);
    setUserCardList(newUserCardList);
  };

  const onCardDelete = (id) => {
    const deletedCard = userCardList.filter((obj) => obj.id === id);
    const updateCards = cards.concat(deletedCard);
    updateCards.sort((a, b) => a.id - b.id);
    setCards(updateCards);

    const updateUserCardList = userCardList.filter((obj) => obj.id !== id);
    setUserCardList(updateUserCardList);
  };

  const onRepaymentDaySelect = (e) => {
    console.log(e.target.value);
  };

  const onWantCutCardSelect = (e) => {
    setWantCut(!wantCut);
  };

  return (
    <Container>
      <Title margin="66px 0 50px 0" text="회원가입" />
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
        margin="auto"
      />
      {/* Email */}
      <EmailInput
        label="이메일"
        type="text"
        placeholder="이메일을 입력해주세요"
        margin="0 17px 0 106px"
        value={email}
        onChange={onEmailChange}
        onFocus={onEmailFocus}
        onClick={emailExistsCheck}
        disabled={!isEmail}
        opacity={!isEmail && "50%"}
        hoverOpacity={!isEmail && "50%"}
        cursor={!isEmail && "default"}
      />
      {emailFocused ? (
        email !== "" && isEmail ? (
          emailExists ? (
            <Notification color="#FF6B6B" margin="4px 160px 0 0">
              * 이미 존재하는 이메일입니다.
            </Notification>
          ) : (
            <Notification>* 사용 가능한 이메일입니다.</Notification>
          )
        ) : (
          <Notification color="#FF6B6B" margin="4px 175px 0 0">
            * 이메일 형식을 지켜주세요
          </Notification>
        )
      ) : null}
      {/* Password */}
      <Input
        marginLabel="18px 255px 0 0"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="auto"
        value={password}
        onChange={onPasswordChange}
      />
      <Input
        marginLabel="18px 225px 0 0"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        margin="auto"
        value={passwordCheck}
        onChange={onPasswordChangeCheck}
      />
      {password === "" ? null : password === passwordCheck ? (
        <Notification margin="4px 186px 0 0">
          * 비밀번호가 일치합니다.
        </Notification>
      ) : (
        <Notification color="#FF6B6B" margin="4px 152px 0 0">
          * 비밀번호가 일치하지 않습니다.
        </Notification>
      )}
      {/* Card */}
      <CardSelect
        label="카드 등록"
        text="카드를 선택해주세요"
        options={cards}
        onChange={onCardChange}
        margin="0"
      />
      <FlexContainer>
        {userCardList.map((obj) => (
          <CardList
            key={obj.id}
            text={obj.name}
            onTextClick={onWantCutCardSelect}
            onClick={() => onCardDelete(obj.id)}
            background={wantCut === true ? "#97bfb4" : "white"}
            color={wantCut === true ? "white" : "#97bfb4"}
            btnBackground={wantCut === true ? "#97bfb4" : "white"}
            xColor={wantCut === true ? "white" : "#97bfb4"}
          />
        ))}
      </FlexContainer>
      <Select
        label="카드 상환일"
        text="카드 상환일을 선택해주세요 (1개 선택 가능)"
        options={["1일", "5일", "10일", "15일", "20일", "25일"]}
        onChange={onRepaymentDaySelect}
        margin="0"
      />
      {/* Button */}
      <Link to="/login">
        <BigButton text="가입하기" margin="28px auto 12px auto" />
      </Link>
      <Link to="/">
        <BigButton
          text="취소"
          background="white"
          color="#97BFB4"
          border="1px solid #97BFB4"
          margin="0 auto 50px auto"
        />
      </Link>
    </Container>
  );
}

export default SignUpPage;