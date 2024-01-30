module.exports = (componentName) => ({
  content: `
import React from "react";
import { render } from "@testing-library/react";

import ${componentName} from "./${componentName}";
import { ${componentName}Props } from "./${componentName}.types";

describe("Test Component", () => {
  let props: ${componentName}Props;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<${componentName} {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "test foo text";
    const { getByTestId } = renderComponent();

    const component = getByTestId("${componentName}");

    expect(component).toHaveTextContent("test foo text");
  });
});
`,
  extension: `.test.tsx`
})
