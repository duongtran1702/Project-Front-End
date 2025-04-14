let addImage = document.getElementById('add-image');
let imageRecipe = document.getElementById('image-recipe');
let imageClear = document.getElementById('clear-image');
let inputLinkImage = document.getElementById('input-link-image');
let linkImage; //1

let boxImageBot = document.getElementById('box-image-bot');
let boxCategory = document.getElementById('box-category');
const categoryOptions = document.querySelectorAll('.category-option');
let categoryName = document.getElementById('category-name');

addImage.addEventListener('click', () => {
    inputLinkImage.style.display = 'flex';
    addImage.style.display = 'none';
    inputLinkImage.focus();
});

inputLinkImage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        imageRecipe.src = inputLinkImage.value;
        linkImage = inputLinkImage.value;
        imageRecipe.style.display = 'block';
        imageClear.style.display = 'block';
        inputLinkImage.style.display = 'none';
        addImage.style.display = 'none';
    }
});

let newCategory; //2

let like = 0;
let boxLike = document.getElementById('box-like');
let iconLike = document.querySelector('.icon-like');
iconLike.addEventListener('click', () => {
    like++;
    boxLike.querySelector('div').textContent = like;
});

const btn = document.getElementById('expand-modal');
const modal = document.getElementById('modal-add-ingredient');

btn.addEventListener('click', () => {
    if (!modal.classList.contains('hidden')) {
        // Đang hiện → thì ẩn mượt + sau đó display none
        modal.classList.add('hidden');
        btn.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // 300ms = thời gian transition
    } else {
        // Đang ẩn → thì hiển thị lại + bỏ class ẩn
        modal.style.display = 'block';
        btn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
        requestAnimationFrame(() => {
            modal.classList.remove('hidden');
        });
    }
});

let addNewRecipe = document.getElementById('add-recipe');

let overlay_1 = document.getElementById('overlay-1');
let overlay_2 = document.getElementById('overlay-2');

let mainCard = document.querySelector('main');

let btnPublish = document.getElementById('publish');

let closeDetailRecipe = document.getElementById('icon-close-detail');
closeDetailRecipe.addEventListener('click', () => {
    overlay_2.style.display = 'none';
    mainCard.style.height = 'fit-content';
});
let imageRecipe_1 = document.getElementById('image-recipe-1');
let nameRecipe_1 = document.getElementById('name-recipe');

let description_1 = document.getElementById('description');
let author_1 = document.getElementById('author');
let totalTime_1 = document.getElementById('total-time');
let preparationTime_1 = document.getElementById('preparation-time');
let finalWeight_1 = document.getElementById('final-weight-1');
let portion_1 = document.getElementById('portion');
let listIngredient_1 = document.getElementById('list-ingredient-1');
console.log(listIngredient_1);
let listCookingMethod_1 = document.getElementById('list-cooking-method-1');
let nameCategory_1 = document.getElementById('name-category-1');
let iconFavorite = document.getElementById('icon-favorite');
let numberFavorite = document.getElementById('number-favorite');
console.log(numberFavorite);
