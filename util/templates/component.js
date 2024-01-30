module.exports = (componentName) => ({
  content: `
import React from "react";
import { ${componentName}Props } from "./${componentName}.types";
import { Styled${componentName} } from "./${componentName}.styles";

const ${componentName}: React.FC<${componentName}Props> = ({ foo }) => {
  
  return (
    <Styled${componentName} data-testid="${componentName}">{foo}</Styled${componentName}>)
  };

export default ${componentName};

`,
  extension: `.tsx`
})
