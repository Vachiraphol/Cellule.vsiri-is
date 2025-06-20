// ดึงค่าทุกอย่างจาก cookie มาแสดงตอนโหลดหน้าเว็บ
window.onload = function () {
  const todos = getTodos();
  for (let i = todos.length - 1; i >= 0; i--) {
    createTodoElement(todos[i]);
  }
};

// เพิ่มรายการใหม่
function addTodo() {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    createTodoElement(text.trim());
    saveTodo(text.trim());
  }
}

// สร้าง DOM element สำหรับ TODO
function createTodoElement(text) {
  const todo = document.createElement("div");
  todo.className = "todo";
  todo.innerText = text;

  todo.onclick = function () {
    if (confirm("Do you want to delete this TO DO?")) {
      todo.remove();
      deleteTodo(text);
    }
  };

  const list = document.getElementById("ft_list");
  list.insertBefore(todo, list.firstChild);
}

// -------------------- จัดการ Cookie --------------------

// อ่าน cookie แล้วคืนค่าเป็น array
function getTodos() {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  const todoCookie = cookies.find(cookie => cookie.startsWith("todos="));
  if (todoCookie) {
    try {
      return JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
    } catch {
      return [];
    }
  }
  return [];
}

// บันทึก TODO ใหม่
function saveTodo(text) {
  const todos = getTodos();
  todos.push(text);
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

// ลบ TODO ออกจาก cookie
function deleteTodo(text) {
  let todos = getTodos();
  todos = todos.filter(item => item !== text);
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}
