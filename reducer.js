
import storage from './ultil/storage.js'

const init = {
    todos: storage.get(),
    filter: 'all', // trạng thái đang được hiển thị (all, active, completed)
    filters: {
        all: () => true, // hien thi tat ca 
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null,
}


const actions = {
    add({todos}, title) { // vì object có tính tham chiếu nên không cần trả về state mới
        if (title) {
            todos.push({title, completed: false})
            storage.set(todos)
        }
    },
    toggle({todos}, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },
    toggleAll({todos}, completed) {
        todos.forEach(todo => todo.completed = completed)
        storage.set(todos)
    },
    destroy({todos}, index) {
        todos.splice(index, 1) 
        storage.set(todos)
    },
    switchFilter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        state.filter = 'all'
        storage.set(state.todos)
    },
    startEdit(state, editIndex) {
        state.editIndex = editIndex;
    },
    endEdit(state, title) {
        if (state.editIndex !== null) {
            if (title) {
                state.todos[state.editIndex].title = title
            }
            else {
                state.todos.splice(state.editIndex, 1) 
            }
            state.editIndex = null
            storage.set(state.todos)
        }
    },
    cancelEdit(state) {
        state.editIndex = null;
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args) // sau khi chạy xong vẫn trả về state
    return state
}