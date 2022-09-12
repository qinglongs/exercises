import { render } from '@testing-library/react';
import PageList from './PageList/index';

it("渲染pageList", async () => {
  const {container} =  render(<PageList title='自定义title' />,{container:document.createElement('div')})
  // eslint-disable-next-line testing-library/no-node-access
  expect(container!.querySelector?.(".title")!.textContent).toBe('自定义title');
});