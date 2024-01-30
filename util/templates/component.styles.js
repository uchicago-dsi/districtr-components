module.exports = (componentName) => ({
  content: `
import styled from 'styled-components';

export const Styled${componentName} = styled.div\`
  padding: ${(props) => props.theme.spacing[xs]};
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
`,
  extension: `.ts`
})
