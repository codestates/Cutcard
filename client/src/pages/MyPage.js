import React, { useState } from 'react';
import { Input, Notification } from '../components/Input';
import { BigButton } from '../components/Button';
import { Container, Title } from '../components/Common';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { CardSelect, Select } from '../components/Select';
import CardList from '../components/CardList';
import { FlexContainer } from '../components/Common';
import styled from 'styled-components';
import axios from 'axios';
import { useBeforeunload } from 'react-beforeunload';

const Text = styled.div`
  font-size: 14px;
  color: #7c8986;
  text-decoration: underline;
`;

function MyPage({
  setIsLogin,
  accessToken,
  setAccessToken,
  cardsList,
  userInfo,
  setUserInfo,
  userCards,
  setUserCards,
}) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [selected, setSelected] = useState('');

  const notSelectedCards = cardsList.filter(
    (obj) => userCards.map((obj) => obj.cardId).includes(obj.id) === false,
  );
  const [cards, setCards] = useState(notSelectedCards);

  const selectedCards = cardsList.filter(
    (obj) => userCards.map((obj) => obj.cardId).includes(obj.id) === true,
  );
  const selectedCardsIsCut = selectedCards.map((select) => {
    return userCards
      .filter((userCard) => select.id === userCard.cardId)
      .map((userCard) => {
        return {
          ...select,
          isCut: userCard.isCut,
        };
      })[0];
  });
  const [userCardList, setUserCardList] = useState(selectedCardsIsCut);
  const [repaymentDay, setRepaymentDay] = useState(userCards[0].repaymentDay);

  const navigate = useNavigate();

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
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
    const selectedDataUpdate = { ...selectedData[0], isCut: false };
    const newUserCardList = userCardList.concat(selectedDataUpdate);
    setUserCardList(newUserCardList);
  };

  const onCardDelete = (id) => {
    const deletedCard = userCardList.filter((obj) => obj.id === id);
    const updateCards = cards.concat({
      id: deletedCard[0].id,
      name: deletedCard[0].name,
    });
    updateCards.sort((a, b) => a.id - b.id);
    setCards(updateCards);

    const updateUserCardList = userCardList.filter((obj) => obj.id !== id);
    setUserCardList(updateUserCardList);
  };

  const onRepaymentDaySelect = (e) => {
    const value = e.target.value;
    const repaymentDate = value.slice(0, value.length - 1);
    setRepaymentDay(Number(repaymentDate));
  };

  const onWantCutCardSelect = (e) => {
    const value = e.target.innerText;
    const selected = userCardList.filter((obj) => obj.name === value)[0];
    const index = userCardList.findIndex((obj) => obj.name === value);
    selected.isCut = !selected.isCut;
    userCardList[index] = selected;
    setUserCardList([...userCardList]);
  };

  const onUpdateClick = async () => {
    if (password === passwordCheck) {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/userinfo`,
          {
            nickname: nickname,
            password: password,
            repaymentDay: repaymentDay,
            cards: userCardList.map((obj) => {
              return {
                id: obj.id,
                isCut: obj.isCut,
              };
            }),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          setAccessToken('');
          setUserCards([]);
          setUserInfo({});
          setIsLogin(false);
        });
    }
  };

  const onSignOutClick = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setAccessToken('');
        setUserCards([]);
        setUserInfo({});
      })
      .then(() => {
        setIsLogin(false);
      });
  };

  useBeforeunload((event) => event.preventDefault());

  return (
    <Container>
      <Title margin="66px 0 50px 0" text="???????????? ??????" />
      <Input
        label="?????????"
        type="text"
        placeholder={userInfo.nickname}
        margin="auto"
        onChange={onNicknameChange}
      />
      <Input
        label="?????????"
        type="text"
        margin="auto"
        readOnly={true}
        value={userInfo.email}
      />

      <Input
        marginLabel="18px 226px 0 0"
        label="???????????? ??????"
        type="password"
        placeholder="??????????????? ??????????????????"
        margin="auto"
        value={password}
        onChange={onPasswordChange}
      />
      <Input
        marginLabel="18px 225px 0 0"
        label="???????????? ??????"
        type="password"
        placeholder="??????????????? ?????? ??? ??????????????????"
        margin="auto"
        value={passwordCheck}
        onChange={onPasswordChangeCheck}
      />
      {password === '' ? null : password === passwordCheck ? (
        <Notification margin="4px 186px 0 0">
          * ??????????????? ???????????????.
        </Notification>
      ) : (
        <Notification color="#FF6B6B" margin="4px 152px 0 0">
          * ??????????????? ???????????? ????????????.
        </Notification>
      )}

      <CardSelect
        label="?????? ??????"
        text="????????? ??????????????????"
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
            background={obj.isCut ? '#97bfb4' : 'white'}
            color={obj.isCut ? 'white' : '#97bfb4'}
            btnBackground={obj.isCut ? '#97bfb4' : 'white'}
            xColor={obj.isCut ? 'white' : '#97bfb4'}
          />
        ))}
      </FlexContainer>
      <Select
        padding="25px 238px 9px 0"
        label="?????? ?????????"
        text={`?????? ???????????? ?????????????????? (?????? ${userCards[0].repaymentDay}???)`}
        options={['1???', '5???', '10???', '15???', '20???', '25???']}
        onChange={onRepaymentDaySelect}
      />

      <NavLink
        to="/login"
        style={{ textDecoration: 'none', cursor: 'default' }}
      >
        <BigButton
          text="????????????"
          margin="0px auto 12px auto"
          onClick={onUpdateClick}
          disabled={password !== passwordCheck}
          opacity={password !== passwordCheck ? '50%' : 0}
          hoverOpacity={password !== passwordCheck ? '50%' : 0}
          cursor={password !== passwordCheck ? 'default' : 'pointer'}
        />
      </NavLink>
      <BigButton
        text="??????"
        background="white"
        color="#97BFB4"
        border="1px solid #97BFB4"
        margin="0 auto 50px auto"
        onClick={() => navigate('/')}
      />
      <Container>
        <Link to="/">
          <Text onClick={onSignOutClick}>????????????</Text>
        </Link>
      </Container>
    </Container>
  );
}

export default MyPage;
