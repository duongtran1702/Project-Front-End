document.querySelectorAll('.sidebar-item').forEach((item) => {
    item.addEventListener('click', function () {
        document
            .querySelectorAll('.sidebar-item')
            .forEach((i) => i.classList.remove('selected'));
        this.classList.add('selected');
        if(this.closest('#homepage')){
            window.location.href="/Home/home.html"
        }
        else if(this.closest('#foods')){
            window.location.href="/Foods/foods.html"
        }
        else if(this.closest('#recipes')){
            window.location.href="/Recipes/recipes.html"
        }
       
    });
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
