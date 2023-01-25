import './style.css';

const testHead = document.createElement('h1');
testHead.classList.add('logo');
testHead.textContent = 'Todo List';
document.body.appendChild(testHead);

const testPara = document.createElement('p');
testPara.textContent =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. At eligendi magnam sed debitis omnis commodi officiis autem aut quisquam ex perferendis, eveniet sunt, vel atque, soluta iste dignissimos porro alias!';
document.body.appendChild(testPara);
