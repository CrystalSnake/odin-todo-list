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
    'h-[600px]',
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
  modalHead.textContent = 'Add';
  modal.appendChild(modalHead);
  const modalDescription = document.createElement('p');
  modalDescription.textContent =
    'To add a task or project, select the appropriate mode using the radio button.';
  modal.appendChild(modalDescription);
  const addHead = document.createElement('h3');
  addHead.classList.add('text-xl', 'my-2');
  addHead.textContent = 'Add mode';
  modal.appendChild(addHead);
  const list = document.createElement('ul');
  list.classList.add('grid', 'w-full', 'gap-5', 'sm:grid-cols-2');
  list.appendChild(getModeButton('Task'));
  list.appendChild(getModeButton('Project'));
  modal.appendChild(list);
  modal.appendChild(getForm('note'));

  const buttons = document.createElement('div');
  buttons.classList.add('flex', 'gap-3', 'justify-end', 'mt-3');
  buttons.appendChild(getButton('Close', 'border-rose-500', 'close'));

  buttons.appendChild(getButton('Add', 'border-blue-500', 'add'));
  modal.appendChild(buttons);

  modalContainer.appendChild(overlay);
  modalContainer.appendChild(modal);
  return modalContainer;
}

function getModeButton(mode) {
  const listItem = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'radio';
  input.id = `${mode.toLowerCase()}`;
  input.name = 'mode';
  input.value = `${mode.toLowerCase()}`;
  input.classList.add('hidden', 'peer');
  listItem.appendChild(input);
  const label = document.createElement('label');
  label.setAttribute('for', `${mode.toLowerCase()}`);
  label.classList.add(
    'inline-flex',
    'items-center',
    'justify-between',
    'w-full',
    'p-5',
    'text-gray-500',
    'bg-white',
    'border',
    'border-gray-200',
    'rounded-lg',
    'cursor-pointer',
    'dark:hover:text-gray-300',
    'dark:border-gray-700',
    'dark:peer-checked:text-blue-500',
    'peer-checked:border-blue-600',
    'peer-checked:text-blue-600',
    'hover:text-gray-600',
    'hover:bg-gray-100',
    'dark:text-gray-400',
    'dark:bg-gray-800',
    'dark:hover:bg-gray-700'
  );
  const block = document.createElement('div');
  label.appendChild(block);
  const name = document.createElement('div');
  name.classList.add('w-full', 'text-lg');
  name.textContent = mode;
  block.appendChild(name);
  block.classList.add('block');
  listItem.appendChild(label);
  return listItem;
}

function getForm(mode) {
  const formContainer = document.createElement('div');
  const form = document.createElement('form');
  if (mode === 'note') {
    form.insertAdjacentHTML(
      'beforeend',
      `<div>
		<form action="#" id="add-task" method="post">
			<legend class="my-3">
				Please fill all field marked with *, then press "Add" button.
			</legend>
			<div>
				<label for="task-title">
				<span class="block text-md font-medium">Task title*</span>
				</label>
				<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="text" name="task-title" id="task-title" required />
			</div>
	
			<div>
				<label for="task-description">
					<span class="block text-md font-medium">Task description*</span>
				</label>
				<textarea class="h-100 w-full p-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" name="task-description" id="task-description"></textarea>
			</div>
		</form>
	</div>`
    );
  } else {
    form.insertAdjacentHTML(
      'beforeend',
      `<div>
		<form action="#" id="add-project" method="post">
			<legend class="my-3">
				Please fill all field marked with *, then press "Add" button.
			</legend>
			<div>
				<label for="project-title">
				<span class="block text-md font-medium">Project title*</span>
				</label>
				<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="text" name="project-title" id="project-title" required />
			</div>
	
			<div>
				<label for="project-description">
					<span class="block text-md font-medium">Project description*</span>
				</label>
				<textarea class="h-100 w-full p-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" name="task-description" id="project-description"></textarea>
			</div>
		</form>
	</div>`
    );
  }
  formContainer.appendChild(form);
  return formContainer;
}

function getButton(name, color, id) {
  const button = document.createElement('button');
  button.classList.add('px-3', 'py-3', 'border', 'rounded-lg', color);
  button.setAttribute('id', id);
  button.textContent = name;
  return button;
}

export default getModal;
