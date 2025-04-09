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
let loadAccount = localStorage.getItem('accounts');
let accounts = JSON.parse(loadAccount);

let loadAccCurrent = localStorage.getItem('account-current');
let accountCurrent = JSON.parse(loadAccCurrent);

let found = accounts.find((temp) => temp.email === accountCurrent.email);

if (found) user.innerText = found.username;
else user.innerText = 'Admin';

let signOut = document.getElementById('sign-out');
signOut.addEventListener('click', () => {
    if (window.confirm('Bạn chắc chắn muốn đăng xuất')) {
        setTimeout(() => {
            window.location.href = '/Sign%20in/sign-in.html';
        }, 300);
    }
});

// if (this.collections.length === 0) {
//     this.collections.push(
//         new FoodCard(
//             '/my-photos/photo1.png',
//             'Mango Coconut Chia Pudding',
//             'Lily Thompson',
//             0,
//             'Diabetic Friendly',
//             150,
//             220,
//             7,
//             30,
//             8
//         ),
//         new FoodCard(
//             '/my-photos/photo2.png',
//             'Avocado Toast',
//             'John Doe',
//             0,
//             'Vegan',
//             120,
//             180,
//             5,
//             20,
//             6
//         ),
//         new FoodCard(
//             '/my-photos/photo3.png',
//             'Berry Smoothie Bowl',
//             'Emma Watson',
//             0,
//             'Low Calorie',
//             200,
//             150,
//             3,
//             25,
//             5
//         ),
//         new FoodCard(
//             '/my-photos/photo4.png',
//             'Quinoa Salad',
//             'Chris Evans',
//             0,
//             'Gluten Free',
//             180,
//             250,
//             8,
//             35,
//             10
//         ),
//         new FoodCard(
//             '/my-photos/photo5.png',
//             'Grilled Chicken',
//             'Sophia Lee',
//             0,
//             'High Protein',
//             200,
//             300,
//             10,
//             15,
//             25
//         ),
//         new FoodCard(
//             '/my-photos/photo6.png',
//             'Greek Yogurt Parfait',
//             'Michael Brown',
//             0,
//             'Low Fat',
//             100,
//             120,
//             2,
//             15,
//             10
//         ),
//         new FoodCard(
//             '/my-photos/photo7.png',
//             'Vegetable Stir Fry',
//             'Olivia Green',
//             0,
//             'Vegetarian',
//             150,
//             200,
//             6,
//             20,
//             8
//         ),
//         new FoodCard(
//             '/my-photos/photo8.png',
//             'Salmon Sushi',
//             'James White',
//             0,
//             'Seafood',
//             180,
//             220,
//             7,
//             10,
//             15
//         ),
//         new FoodCard(
//             '/my-photos/photo9.png',
//             'Pumpkin Soup',
//             'Isabella Black',
//             0,
//             'Comfort Food',
//             130,
//             170,
//             4,
//             15,
//             6
//         ),
//         new FoodCard(
//             '/my-photos/photo10.png',
//             'Chocolate Protein Shake',
//             'William Gray',
//             0,
//             'Post Workout',
//             250,
//             300,
//             8,
//             20,
//             30
//         ),
//         new FoodCard(
//             '/my-photos/photo11.png',
//             'Caesar Salad',
//             'Emily Davis',
//             0,
//             'Classic',
//             150,
//             200,
//             5,
//             10,
//             7
//         ),
//         new FoodCard(
//             '/my-photos/photo12.png',
//             'Spaghetti Bolognese',
//             'Daniel Harris',
//             0,
//             'Italian',
//             300,
//             400,
//             12,
//             50,
//             20
//         ),
//         new FoodCard(
//             '/my-photos/photo13.png',
//             'Tofu Stir Fry',
//             'Mia Wilson',
//             0,
//             'Vegan',
//             140,
//             180,
//             6,
//             25,
//             10
//         ),
//         new FoodCard(
//             '/my-photos/photo14.png',
//             'Shrimp Tacos',
//             'Benjamin Martinez',
//             0,
//             'Mexican',
//             200,
//             250,
//             8,
//             30,
//             15
//         ),
//         new FoodCard(
//             '/my-photos/photo15.png',
//             'Banana Pancakes',
//             'Charlotte Garcia',
//             0,
//             'Breakfast',
//             180,
//             220,
//             7,
//             40,
//             6
//         ),
//         new FoodCard(
//             '/my-photos/photo16.png',
//             'Chicken Caesar Wrap',
//             'Lucas Rodriguez',
//             0,
//             'Lunch',
//             250,
//             300,
//             10,
//             35,
//             20
//         ),
//         new FoodCard(
//             '/my-photos/photo17.png',
//             'Beef Stew',
//             'Amelia Lopez',
//             0,
//             'Comfort Food',
//             300,
//             350,
//             12,
//             40,
//             25
//         ),
//         new FoodCard(
//             '/my-photos/photo18.png',
//             'Fruit Salad',
//             'Ethan Gonzalez',
//             0,
//             'Healthy',
//             100,
//             120,
//             2,
//             15,
//             5
//         ),
//         new FoodCard(
//             '/my-photos/photo19.png',
//             'Grilled Salmon',
//             'Harper Clark',
//             0,
//             'Seafood',
//             220,
//             280,
//             9,
//             10,
//             20
//         ),
//         new FoodCard(
//             '/my-photos/photo20.png',
//             'Veggie Burger',
//             'Aiden Lewis',
//             0,
//             'Vegetarian',
//             200,
//             250,
//             8,
//             30,
//             15
//         )
//     );
// }
// if (this.ingredients.length === 0) {
//     this.ingredients.push(
//         new Ingredient(
//             'Salmon',
//             'Fish',
//             'Protein',
//             100,
//             206,
//             12,
//             0,
//             22,
//             60,
//             0,
//             50,
//             70,
//             0,
//             0,
//             4,
//             0,
//             2,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             50,
//             20,
//             35,
//             30,
//             30,
//             0,
//             2,
//             0,
//             10,
//             1,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0
//         ),
//         new Ingredient(
//             'Chicken',
//             'Poultry',
//             'Protein',
//             100,
//             165,
//             3.6,
//             0,
//             31,
//             85,
//             0,
//             70,
//             70,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             15,
//             1,
//             25,
//             16,
//             50,
//             0,
//             1,
//             5,
//             0,
//             12,
//             1,
//             1,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0
//         ),
//         new Ingredient(
//             'Broccoli',
//             'Vegetable',
//             'Vegetable',
//             100,
//             34,
//             0.4,
//             7,
//             2.8,
//             0,
//             2.6,
//             33,
//             89.2,
//             112,
//             0,
//             0,
//             89.2,
//             0,
//             0.3,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             47,
//             0.7,
//             30,
//             11,
//             6,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0
//         ),
//         new Ingredient(
//             'Apple',
//             'Fruit',
//             'Fruit',
//             100,
//             52,
//             0.2,
//             14,
//             0.3,
//             0,
//             2.4,
//             4,
//             85.56,
//             0,
//             0,
//             0,
//             4.6,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             7,
//             6,
//             8,
//             5,
//             100,
//             0,
//             1,
//             0,
//             5,
//             4,
//             0,
//             0,
//             0,
//             0,
//             0
//         ),
//         new Ingredient(
//             'Carrot',
//             'Vegetable',
//             'Vegetable',
//             100,
//             41,
//             0.2,
//             10,
//             0.9,
//             0,
//             2.8,
//             69,
//             88,
//             0,
//             0,
//             0,
//             7.5,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0,
//             12,
//             0.6,
//             34,
//             5,
//             9,
//             0,
//             0,
//             0,
//             6,
//             0,
//             0,
//             0,
//             0,
//             0,
//             0
//         )
//     );
// }

/* <div class="card-ingredient">
    <div class="box-1a">
        <div class="line-1">Keto 90 Second Bread</div>
        <div class="line-2">Community Recipes</div>
        <div class="line-3">
            <input type="text" value="1" class="line-3a" />
            <div class="line-3b">portion (87 grams)</div>
            <div class="line-3c">87g</div>
        </div>
    </div>
    <div class="box-2a">301 kcal</div>
    <div class="box-2a">27 g</div>
    <div class="box-2a">6 g</div>
    <div class="box-2a">11 g</div>
    <div class="box-3a">
        <i class="fa-solid fa-plus"></i>
    </div>
</div>; */
/* <div class="an-ingredient">
    <div class="ingredient-content">
        1 serving of babyfood, water, bottled, GERBER, without added fluoride
        (113 g)
    </div>
    <div class="delete-ingredient">
        <i class="fa-solid fa-trash"></i>
    </div>
</div>; */
