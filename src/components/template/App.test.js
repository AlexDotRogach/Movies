import renderer from 'react-test-renderer';
import App from './App';

it('check app text', () => {
  const component = renderer.create(<App></App>);

  const { children } = component.toJSON();
  expect(...children).toBe('React template');
});
