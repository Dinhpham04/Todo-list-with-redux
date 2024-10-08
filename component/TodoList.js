import html from '../core.js';
import { connect } from '../store.js'
import TodoItem from '../component/TodoItem.js'
function TodoList({todos, filter, filters}) { // chỉ nhận thuộc thuộc tính todes của đối tượng được truyền vào 
    return html`
        <section class="main">
				<input
					id="toggle-all"
					class="toggle-all"
					type="checkbox"
					onchange="dispatch('toggleAll', this.checked)"
					${todos.every(filters.completed) && 'checked'}
				>
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
					${todos.filter(filters[filter])
						   .map((todo, index) => 
								TodoItem({todo, index})
					)} <!-- tạo ra một đối tượng có 1 thuộc tính là todo -->
				</ul>
			</section>
    `
}

export default connect()(TodoList)