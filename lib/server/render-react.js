import ReactDOMServer from 'react-dom/server';


export default function renderReact(element) {
  return ReactDOMServer.renderToString(element);
}
