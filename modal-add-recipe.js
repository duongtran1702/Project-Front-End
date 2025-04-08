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

let basicInformation = {}; // Đối tượng để lưu thông tin

// Lặp qua tất cả các form
document.querySelectorAll('.form').forEach((form) => {
    const label = form.querySelector('div:first-child'); // Lấy label (div đầu tiên)
    const valueDiv = form.querySelector('.editable-field'); // Lấy div chứa giá trị hiện tại
    const input = form.querySelector('.editable-field-input'); // Lấy input ẩn
    const editIcon = form.querySelector('.icon-edit img'); // Lấy icon chỉnh sửa

    // Khi nhấn vào icon sửa
    editIcon.addEventListener('click', () => {
        input.value = valueDiv.textContent; // Lấy giá trị hiện tại từ div và gán vào input

        // Ẩn div và hiển thị input
        valueDiv.style.display = 'none';
        input.style.display = 'block';
        input.focus(); // Đặt focus vào input
    });

    // Khi input mất focus hoặc người dùng nhấn Enter
    input.addEventListener('blur', () => {
        valueDiv.textContent = input.value; // Cập nhật giá trị cho div
        valueDiv.style.display = 'block'; // Hiển thị lại div
        input.style.display = 'none'; // Ẩn input

        // Cập nhật vào đối tượng basicInformation với key là nội dung label
        basicInformation[label.textContent] = input.value;
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            valueDiv.textContent = input.value; // Cập nhật giá trị cho div
            valueDiv.style.display = 'block'; // Hiển thị lại div
            input.style.display = 'none'; // Ẩn input

            // Cập nhật vào đối tượng basicInformation với key là nội dung label
            basicInformation[label.textContent] = input.value;
        }
    });

    // Cập nhật giá trị ban đầu khi trang tải
    basicInformation[label.textContent] = valueDiv.textContent;
});


