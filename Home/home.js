document.querySelectorAll('.sidebar-item').forEach((item) => {
    item.addEventListener('click', function () {
        // Xóa lớp selected cho tất cả các item
        document
            .querySelectorAll('.sidebar-item')
            .forEach((i) => i.classList.remove('selected'));

        // Thêm lớp selected cho item được chọn
        this.classList.add('selected');

        // Chuyển hướng tùy theo ID
        const id = this.id;
        if (id === 'homepage') {
            window.location.href = '/Home/home.html';
        } else if (id === 'foods') {
            window.location.href = '/Foods/foods.html';
        } else if (id === 'recipes') {
            window.location.href = '/Recipes/recipes.html';
        }
    });
});

// Tự động thêm selected theo trang hiện tại
window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // VD: "foods.html"
    const map = {
        'home.html': 'homepage',
        'foods.html': 'foods',
        'recipes.html': 'recipes',
    };

    const currentId = map[currentPage];
    if (currentId) {
        const currentItem = document.getElementById(currentId);
        if (currentItem) {
            currentItem.classList.add('selected');
        }
    }
});

let menu = document.getElementById('menu');
let sideBar = document.getElementById('side-bar');
let containerMain = document.getElementById('container-main');
menu.addEventListener('click', () => {
    sideBar.classList.toggle('shrink');
    sideBar.classList.toggle('expand');
    containerMain.classList.toggle('shrink');
    containerMain.classList.toggle('expand');
});

let user = document.getElementById('user');
let loadAccount = localStorage.getItem('Accounts');
let accounts = JSON.parse(loadAccount);

let loadAccCurrent = localStorage.getItem('accountCurrent');
let accountCurrent = JSON.parse(loadAccCurrent);
user.innerText=accountCurrent.username;

let signOut = document.getElementById('sign-out');
signOut.addEventListener('click', () => {
    if (window.confirm('Bạn chắc chắn muốn đăng xuất')) {
        setTimeout(() => {
            window.location.href = '/Sign%20in/sign-in.html';
        }, 300);
    }
});


