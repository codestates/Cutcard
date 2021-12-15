import { useState } from 'react';
import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 1130px;
  height: 550px;
  color: red;
  display: flex;
  border: solid 2px black;
  margin: auto;
`;

//! Left
export const LeftContainer = styled.div`
  border: solid 2px black;
  width: 330px;
  display: flex;

  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
`;

export const ButtonContainer = styled.div`
  // border: solid 2px black;
  width: 230px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ChangeButton = styled.button`
  width: 70px;
  height: 40px;
  margin: 0 20px;
  font-size: 24px;
`;
export const OutcomeList = styled.div`
  // border: solid 2px black;
  width: 200px;
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;
export const OutcomeMoney = styled.div`
  color: black;
  margin: 10px 0;
`;
export const TotalMoney = styled.div`
  border: 2px solid black;
  // background-color: blue;
  width: 150px;
  line-height: 50px;
  color: red;
  font-weight: 700;
  margin: 30px 0; ;
`;

//! Center
export const CenterContainer = styled.div`
  border: solid 2px black;
  width: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const LeftMoney = styled.div`
  // border: solid 2px black;
  font-size: 36px;
  height: 70px;
  line-height: 70px;
`;

export const Calendar = styled.div`
  border: solid 2px black;
  width: 450px;
  height: 400px;
  margin: auto;
  position: relarive;
`;

//! Right
export const RigthContainer = styled.div`
  border: solid 2px black;
  width: 300px;
`;

export const SubHead = styled.div`
  border: solid 2px black;
  color: black;
  font-size: 26px;
  height: 70px;
  line-height: 70px;
`;
export const AddOutcome = styled.div`
  border: solid 2px black;
  height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const InputDate = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputOption = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputMoney = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputButton = styled.button`
  margin: 10px 0;
  width: 150px;
  font-size: 24px;
`;

export const MainOutcomes = () => {
  const [leftMoney, setLeftMoney] = useState(100000);
  const [livingExpenses, setLivingExpenses] = useState(500000);
  const [utilityBills, setUtilityBills] = useState(500000);
  const [premium, setPremium] = useState(500000);
  const [etcExpenses, setEtcExpenses] = useState(300000);
  const [totalMoney, setTotalMoney] = useState(livingExpenses + utilityBills + premium + etcExpenses);

  return (
    <>
      <MainContainer>
        <LeftContainer>
          <ButtonContainer>
            <ChangeButton>수입</ChangeButton>
            <ChangeButton>지출</ChangeButton>
          </ButtonContainer>
          <OutcomeList>
            <OutcomeMoney>{`생활비: ${livingExpenses}`}</OutcomeMoney>
            <OutcomeMoney>{`공과금: ${utilityBills}`}</OutcomeMoney>
            <OutcomeMoney>{`보험료: ${premium}`}</OutcomeMoney>
            <OutcomeMoney>{`추가지출: ${etcExpenses}`}</OutcomeMoney>
            <TotalMoney>{`지출합계: ${totalMoney}`}</TotalMoney>
          </OutcomeList>
        </LeftContainer>
        <CenterContainer>
          <LeftMoney>{`남은돈: ${leftMoney} 원`}</LeftMoney>
          <Calendar>{`달력!!!`}</Calendar>
        </CenterContainer>
        <RigthContainer>
          <SubHead>지출 추가</SubHead>
          <AddOutcome>
            <InputDate></InputDate>

            <InputOption></InputOption>
            <InputOption></InputOption>
            <InputOption></InputOption>
            <InputMoney></InputMoney>
            <InputOption></InputOption>
            <InputButton>추가하기</InputButton>
          </AddOutcome>
        </RigthContainer>
      </MainContainer>
    </>
  );
};
