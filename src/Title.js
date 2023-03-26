/* This is Hello React using elements
const root = ReactDOM.createRoot(document.getElementById('root'));

let title = React.createElement('h1', {children: "Hello React"});

root.render(title);
*/

//This is Hello React using components
//ReactDOM.createRoot().render() is always needed (see index.js file)
function Title() {
  return (
    <h1>Hello React</h1>
  );
}

export default Title;
