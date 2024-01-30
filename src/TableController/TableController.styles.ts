import styled from 'styled-components'

export const StyledTableController = styled.div`
  padding: 0;
  background: transparent;
  color: ${(props) => props.theme.foreground};
  padding-bottom: 10px;
  margin-bottom: 10px;
`

export const StyledTableItem = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: minmax(36px, auto);
  grid-column-gap: calc(${(props) => props.theme.spacing['sm']} / 2);
  grid-row-gap: 0;
  padding: 0;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.shapes.borderRadius['md']};
  border: 0.5px solid ${(props) => props.theme.colors.green['500']};
  margin-bottom: calc(${(props) => props.theme.spacing['xs']} / 2);
  &:last-child {
    border-bottom: none;
  }
`

export const TableItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.type.fontSize['sm']};
  font-weight: ${(props) => props.theme.type.fontWeight['400']};
  color: ${(props) => props.theme.foreground};
  grid-area: 1 / 1 / 2 / 5;
`

export const TableItemCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.type.fontSize['md']};
  font-weight: ${(props) => props.theme.type.fontWeight['400']};
  color: ${(props) => props.theme.foreground};
  min-height: 36px;

  &.toggle-wrapper {
    grid-area: 1/1/2/3;
    border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
  }
  &.cell-name {
    grid-area: 1 / 3 / 2 / 12;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${(props) => props.theme.type.fontWeight['600']};
    line-height: ${(props) => props.theme.type.lineHeight['sm']};
  }

  &.cell-value {
    grid-area: 1 / 12 / 2 / 17;
    justify-content: flex-end;
    font-weight: ${(props) => props.theme.type.fontWeight['600']};
    padding-right: ${(props) => props.theme.spacing['xs']};
    cursor: pointer;
  }

  &.cell-wrapper {
    grid-area: 2 / 1 / 3 / 17;
    border-top: 0.5px solid ${(props) => props.theme.colors.gray['200']};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cell-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      //flex-grow: 1;

      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      padding-left: calc(${(props) => props.theme.spacing['sm']} / 2);

      justify-content: flex-start;
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
    }

    .cell-state_left {
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      text-align: center;
      justify-content: center;
      font-size: ${(props) => props.theme.type.fontSize['xs']};
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      padding: 0 ${(props) => props.theme.spacing['xs']};
    }

    .cell-state_right {
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      text-align: center;
      justify-content: center;
      font-size: ${(props) => props.theme.type.fontSize['xs']};
      padding: 0 ${(props) => props.theme.spacing['xs']};
    }
  }
`
