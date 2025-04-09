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

imageClear.addEventListener('click', () => {
    imageRecipe.src = '';
    imageRecipe.style.display = 'none';
    imageClear.style.display = 'none';
    inputLinkImage.style.display = 'none';
    addImage.style.display = 'block';
    inputLinkImage.value = '';
});

let newCategory; //2

boxImageBot.addEventListener('click', () => {
    boxCategory.style.display = 'flex';
});

categoryOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
        const image = boxImageBot.querySelector('img');
        image.src = '/my-photos/icon-2.png';
        boxImageBot.querySelector('span').textContent = e.target.innerText;
        newCategory = e.target.innerText;
    });
});

document.addEventListener('click', (e) => {
    if (!boxImageBot.contains(e.target) && !boxCategory.contains(e.target)) {
        boxCategory.style.display = 'none';
    }
});

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
    btn.innerHTML=`<i class="fa-solid fa-angle-right"></i>`
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300); // 300ms = thời gian transition
  } else {
    // Đang ẩn → thì hiển thị lại + bỏ class ẩn
    modal.style.display = 'block';
    btn.innerHTML=`<i class="fa-solid fa-angle-down"></i>`
    requestAnimationFrame(() => {
      modal.classList.remove('hidden');
    });
  }
});

