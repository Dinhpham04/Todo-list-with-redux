export default function html([first, ...string], ...values) {
    // first là giá trị đầu của mảng, ...string là các giá trị còn lại 
    // values là giá trị của các biến được truyền vào nằm trong ${}
    return values.reduce(
        (acc, cur) => acc.concat(cur, string.shift()), 
        [first]
    )
    .filter(x => x && x!== true || x === 0) // x là truethy nhưng x không được là 'true' 
    .join('')
}

export function createStore(reducer) {
    let state = reducer()
    const roots = new Map()

    // Hàm render ra giao diện
    function render() {  
        for(const [root, component] of roots){
            const output = component()
            root.innerHTML = output
        }
    }
    // Root là điểm bắt đầu của ứng dụng web, nơi toàn bộ ứng dụng được gắn kết (chưa toàn bộ ứng dụng)
    // Component là một hàm trả về một cuối html để dùng render ra giao diện

    return {
        attach(component, root) { // tạo 
            roots.set(root, component) // tạo ra cặp  root: component()
            render()
        }, 
        connect(selector = state => state) { // nếu không truyền đối số gì thì vẫn trả về state 
            return component => (props, ...args) =>
                // props là các thuộc tính được truyền từ component cha và redux store 
                // args là các đối số được truyền còn lại 
                component(Object.assign({}, props, selector(state), ...args))
                // Hàm này sẽ gọi component (chính là app) và trả về tất cả các đối số được truyền vào gộp lại thành một object
        },
        dispatch(action, ...args) { // hàm này đẩy dữ liệu vào store để sử lý
            state = reducer(state, action, args); // dữ liệu qua reducer trong store để tính toán
            render();
        }
    }
}

