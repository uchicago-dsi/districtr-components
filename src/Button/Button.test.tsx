import { render } from '@testing-library/react'
import React from 'react'

import Button from './Button'
import { ButtonProps } from './Button.types'

describe('Test Component', () => {
  let props: ButtonProps

  beforeEach(() => {
    props = {}
  })

  const renderComponent = () => render(<Button {...props}>Test</Button>)

  it('should render foo text correctly', () => {
    const { getByTestId } = renderComponent()

    const component = getByTestId('Button')

    expect(component).toHaveTextContent('Test')
  })

  it('should enter disabled state', () => {
    const { getByTestId } = render(
      <Button disabled={true} {...props}>
        Test
      </Button>
    )

    const component = getByTestId('Button')

    expect(component).toBeDisabled()
  })

  it('should render as submit type button', () => {
    const { getByTestId } = render(
      <Button submit={true} {...props}>
        Test
      </Button>
    )

    const component = getByTestId('Button')

    expect(component).toHaveAttribute('type', 'submit')
  })

  it('should render as button type button', () => {
    const { getByTestId } = render(
      <Button submit={false} {...props}>
        Test
      </Button>
    )

    const component = getByTestId('Button')

    expect(component).toHaveAttribute('type', 'button')
  })

  it('should render the proper role attribute', () => {
    const { getByTestId } = render(
      <Button role="link" {...props}>
        Test
      </Button>
    )

    const component = getByTestId('Button')

    expect(component).toHaveAttribute('role', 'link')
  })

  it('should execute onClick events', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <Button onClick={onClick} {...props}>
        Test
      </Button>
    )

    const component = getByTestId('Button')

    component.click()

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should render a full width button', () => {
    const { getByTestId } = render(
      <Button fullWidth={true} {...props}>
        Test
      </Button>
    )
    const component = getByTestId('Button')

    expect(component).toHaveClass('d-button--full-width')
  })
})
