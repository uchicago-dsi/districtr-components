import styled from 'styled-components'

export const UnitControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

export const UnitHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: 12px;
  width: 100%;
  padding: 8px 8px 4px;
  border-bottom: 1px solid #e6e6e6;
`

export const UnitPagerTitle = styled.h4`
  margin: 0;
`

export const UnitInformation = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: top;
  width: 100%;
  //margin-bottom: 12px;
  padding: 8px;
`
export const UnitColor = styled.div`
  width: 64px;
  height: 56px;
  border-radius: 3px;
  border: 2px solid #333333;
  margin-right: 4px;
`

export const UnitDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const InputWrapper = styled.div`
  width: 100%;
`

export const UnitOptionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  padding: 0;
`

export const DatasetPickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 1;
`

export const DatasetPicker = styled.select`
  width: 100%;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #333333;
  border-radius: 3px;
  height: 24px;
`

export const GhostInput = styled.input`
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  line-height: 1;
  margin-bottom: 2px;

  &:focus {
    outline: none;
    border: 1px solid #333333;
  }
`

export const ChartWrapper = styled.div`
  width: 100%;
  height: 48px;
  margin-bottom: 18px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`

export const UnitNotePadWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  label {
    font-size: 10px;
  }
`

export const UnitNotePad = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #333333;
  border-radius: 3px;
  resize: none;
`

export const PopulationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
`

export const PopulationLabel = styled.label`
  font-size: 10px;
`

export const PopulationValue = styled.div`
  font-size: 16px;
  font-weight: 700;
`
