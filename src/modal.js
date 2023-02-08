import { renderProjectsList, renderTaskList } from './renders';
import Task from './task';
import toDoList from './todolist';

function getModal() {
  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal');
  modalContainer.classList.add(
    'modal',
    'absolute',
    'top-0',
    'left-0',
    'w-full',
    'h-full',
    'hidden'
  );
  const overlay = document.createElement('div');
  overlay.classList.add(
    'bg-black',
    'opacity-50',
    'w-full',
    'h-full',
    'z-10',
    'relative'
  );
  const modal = document.createElement('div');
  modal.classList.add(
    'absolute',
    'max-w-[900px]',
    'w-full',
    'h-auto',
    'bg-gray-100',
    'top-24',
    'left-0',
    'right-0',
    'mx-auto',
    'z-20',
    'py-10',
    'px-16'
  );
  const modalHead = document.createElement('h2');
  modalHead.classList.add('text-3xl', 'mb-2');
  modalHead.textContent = 'Add task';
  modal.appendChild(modalHead);
  modal.appendChild(getForm());
  const buttons = document.createElement('div');
  buttons.classList.add('flex', 'gap-3', 'justify-end', 'mt-3');
  buttons.appendChild(getButton('Close', 'border-rose-500', 'close'));
  buttons.appendChild(getButton('Add', 'border-blue-500', 'add'));
  modal.appendChild(buttons);
  modalContainer.appendChild(overlay);
  modalContainer.appendChild(modal);
  return modalContainer;
}

function getForm() {
  const formContainer = document.createElement('div');
  const form = document.createElement('form');
  form.insertAdjacentHTML(
    'beforeend',
    `<div>
	<form action="#" id="add-task" method="post">
		<legend class="my-3">
			Please fill all field marked with *, then press "Add" button.
		</legend>
		<div>
			<label for="title">
			<span class="block text-md font-medium">Task title*</span>
			</label>
			<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="text" name="task-title" id="title" required />
		</div>

		<div>
			<label for="project">
			<span class="block text-md font-medium">Task project</span>
			</label>
			<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="text" name="task-project" id="project" />
		</div>

		<div>
		<label for="project">
		<span class="block text-md font-medium">Task date</span>
		</label>
		<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="date" name="task-data" id="date" />
	</div>

		<div>
			<label for="description">
				<span class="block text-md font-medium">Task description</span>
			</label>
			<textarea class="h-100 w-full p-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" name="task-description" id="description"></textarea>
		</div>
	</form>
</div>`
  );
  formContainer.appendChild(form);
  return formContainer;
}

function getButton(name, color, id) {
  const button = document.createElement('button');
  button.classList.add('px-3', 'py-3', 'border', 'rounded-lg', color);
  button.setAttribute('id', id);
  button.setAttribute('type', 'submit');
  button.setAttribute('form', 'add-task');
  button.textContent = name;
  if (id === 'add') {
    button.addEventListener('click', () => {
      const newTask = new Task(
        document.querySelector('#title').value,
        document.querySelector('#description').value,
        document.querySelector('#project').value,
        document.querySelector('#date').value
      );
      newTask.add();
      renderProjectsList(toDoList);
      renderTaskList(toDoList);
    });
  } else if (id === 'close') {
    button.addEventListener('click', () => {
      const modal = document.getElementById('modal');
      modal.classList.add('hidden');
    });
  }
  return button;
}

export default getModal;
