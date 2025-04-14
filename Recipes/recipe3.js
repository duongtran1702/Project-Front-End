function load() {
    let collection = localStorage.getItem('Ingredient');
    try {
        let parseIngredient = JSON.parse(collection) || [];
        return parseIngredient.map(
            (item) =>
                new Ingredient(
                    item.name,
                    item.source,
                    item.category,
                    item.quantity,
                    item.energy,
                    item.fat,
                    item.carbohydrate,
                    item.protein,
                    item.cholesterol,
                    item.fiber,
                    item.sodium,
                    item.water,
                    item.vitaminA,
                    item.vitaminB6,
                    item.vitaminB12,
                    item.vitaminC,
                    item.vitaminD,
                    item.vitaminE,
                    item.vitaminK,
                    item.starch,
                    item.lactose,
                    item.alcohol,
                    item.caffeine,
                    item.sugars,
                    item.calcium,
                    item.iron,
                    item.magnesium,
                    item.phosphorus,
                    item.potassium,
                    item.zinc,
                    item.copper,
                    item.fluoride,
                    item.manganese,
                    item.selenium,
                    item.thiamin,
                    item.riboflavin,
                    item.niacin,
                    item.pantothenic,
                    item.folate,
                    item.folic,
                    item.fattyTrans,
                    item.fattySaturated,
                    item.fattyMonounsaturated,
                    item.fattyPolyunsaturated,
                    item.chloride
                )
        );
    } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ localStorage:', error);
        return [];
    }
}
const listCardIngredient = document.getElementById('list-card-ingredient');
let searchFood_1 = document.getElementById('search-1');
let selectCategory_1 = document.getElementById('filter-category-1');
let arrowIcon_1 = document.getElementsByClassName('sort-icon-1');
let sortIcon_1 = arrowIcon_1[0];
let sortNutrient_1 = document.getElementById('select-sort-1');

let listIngredient = document.getElementById('list-ingredient');
function saveRecipe(array) {
    localStorage.setItem('Recipe', JSON.stringify(array));
}

function loadRecipes() {
    return JSON.parse(localStorage.getItem('Recipe')) || [];
}

let activeAccount = JSON.parse(localStorage.getItem('accountCurrent'));
function loadDataRecipe() {
    return (accounts = JSON.parse(localStorage.getItem('Accounts')) || []);
}

function saveAccount(array) {
    localStorage.setItem('Accounts', JSON.stringify(array));
}

function formatNumber_1(value) {
    const num = parseFloat(value);
    if (Number.isInteger(num)) {
        return num;
    }
    const decimalPart = num.toString().split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
        return num.toFixed(2);
    }
    return num;
}

class Ingredient {
    constructor(
        name,
        source,
        category,
        quantity,
        energy,
        fat,
        carbohydrate,
        protein,
        cholesterol,
        fiber,
        sodium,
        water,
        vitaminA,
        vitaminB6,
        vitaminB12,
        vitaminC,
        vitaminD,
        vitaminE,
        vitaminK,
        starch,
        lactose,
        alcohol,
        caffeine,
        sugars,
        calcium,
        iron,
        magnesium,
        phosphorus,
        potassium,
        zinc,
        copper,
        fluoride,
        manganese,
        selenium,
        thiamin,
        riboflavin,
        niacin,
        pantothenic,
        folate,
        folic,
        fattyTrans,
        fattySaturated,
        fattyMonounsaturated,
        fattyPolyunsaturated,
        chloride
    ) {
        this.name = name;
        this.source = source;
        this.category = category;
        this.quantity = quantity;
        this.energy = energy;
        this.fat = fat;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
        this.cholesterol = cholesterol;
        this.fiber = fiber;
        this.sodium = sodium;
        this.water = water;
        this.vitaminA = vitaminA;
        this.vitaminB6 = vitaminB6;
        this.vitaminB12 = vitaminB12;
        this.vitaminC = vitaminC;
        this.vitaminD = vitaminD;
        this.vitaminE = vitaminE;
        this.vitaminK = vitaminK;
        this.starch = starch;
        this.lactose = lactose;
        this.alcohol = alcohol;
        this.caffeine = caffeine;
        this.sugars = sugars;
        this.calcium = calcium;
        this.iron = iron;
        this.magnesium = magnesium;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.zinc = zinc;
        this.copper = copper;
        this.fluoride = fluoride;
        this.manganese = manganese;
        this.selenium = selenium;
        this.thiamin = thiamin;
        this.riboflavin = riboflavin;
        this.niacin = niacin;
        this.pantothenic = pantothenic;
        this.folate = folate;
        this.folic = folic;
        this.fattyTrans = fattyTrans;
        this.fattySaturated = fattySaturated;
        this.fattyMonounsaturated = fattyMonounsaturated;
        this.fattyPolyunsaturated = fattyPolyunsaturated;
        this.chloride = chloride;
    }
    overall() {
        return this.carbohydrate + this.energy + this.fat + this.protein;
    }
}
class ManagerIngredient {
    constructor() {
        this.ingredients = load();
        this.recipe = loadRecipes();
        this.accounts = loadDataRecipe();
        const found = this.accounts.find(
            (temp) => (temp.username = activeAccount.username)
        );
        this.recipeFavorite = found.recipeFavorite;
        numberFavorite.innerText = this.recipeFavorite.length;
        btnPublish.addEventListener('click', () => {
            this.addRecipe();
        });
        addNewRecipe.addEventListener('click', () => {
            overlay_1.style.display = 'flex';
            mainCard.style.height = '2230px';
        });

        this.nutritionPortion = [];
        this.basicInformation = {}; // Đối tượng để lưu thông tin
        this.listCookingMethod = [];

        this.getBasicInformation();
        imageClear.addEventListener('click', () => {
            this.clearImage();
        });
        this.initCategoryBox();
        this.myChart = null; // Dùng để lưu biểu đồ hiện tại
        //bộ code sắp xếp+ lọc+tìm kiếm+phân trang
        if (searchFood_1) {
            let timeout;
            searchFood_1.addEventListener('input', () => {
                clearTimeout(timeout); // Xoá timeout cũ
                timeout = setTimeout(() => {
                    this.search();
                }, 300);
            });
        }
        this.uniqueCategories = [];
        this.filterCategory();
        this.selectedCategory = '';
        this.searchQuery = '';
        this.nutrient = 'overall';
        this.isAscending = true;
        sortIcon_1.addEventListener('click', () => {
            this.typeSort();
        });
        sortNutrient_1.addEventListener('change', (event) => {
            this.nutrient = event.target.value;
            this.filterSortAndPaginate();
        });
        this.currentArray = [];
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.filterSortAndPaginate();

        // Gán container chính & template mẫu
        this.container = document.getElementById('list-cooking-method');
        this.template = this.container.querySelector('.a-cooking-method');
        this.addBlock();
    }

    addRecipe() {
        let check = true;
        if (!linkImage) {
            check = false;
        }
        if (!newCategory) {
            check = false; //category recipe
        }
        if (
            !this.basicInformation['Name'] ||
            !this.basicInformation['Author']
        ) {
            check = false;
        }
        if (!check) {
            alert('Please enter full information');
            return;
        }
        if (this.nutritionPortion.length < 1) {
            alert('Please add at least one nutrient');
            return;
        }
        let existingName = this.recipe.find(
            (temp) =>
                temp.nameRecipe.trim() === this.basicInformation['Name'].trim()
        );
        if (existingName) {
            alert('Tên đã tồn tại !');
            return;
        }
        this.recipe.push({
            isOwned: true,
            image: linkImage,
            categoryRecipe: newCategory,
            nameRecipe: this.basicInformation['Name']
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim(),
            description: this.basicInformation['Description']
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim(),
            author: this.basicInformation['Author'],
            totalTime: this.basicInformation['Total time'],
            preparationTime: this.basicInformation['Preparation time'],
            finalWeight: this.basicInformation['Final weight'],
            portions: this.basicInformation['Portions'],
            listNutrition: this.nutritionPortion,
            listMethod: this.listCookingMethod,
            numberLike: like,
            isFavorite: false,
            energy: this.getTotalBy('energy'),
            fat: this.getTotalBy('fat'),
            carbohydrate: this.getTotalBy('carbohydrate'),
            protein: this.getTotalBy('protein'),
        });
        overlay_1.style.display = 'none';
        mainCard.style.height = 'fit-content';
        saveRecipe(this.recipe);
        Swal.fire({
            title: 'Thành công!',
            text: 'Bạn đã thêm thành công một công thức!',
            confirmButtonText: 'OK',
        }).then((result) => {
            // Kiểm tra nếu người dùng nhấn OK
            if (result.isConfirmed) {
                this.clearImage();
                this.resetCategoryBox();
                this.resetListIngredient();
                this.resetBasicInformation();
                this.resetCookingMethods();
                this.drawChart(0, 0, 0);
                this.resetMicronutrient();
                this.resetMacronutrient();
                temp_1.filterSortAndPaginate();
            }
        });
    }
    clearImage() {
        imageRecipe.src = '';
        imageRecipe.style.display = 'none';
        imageClear.style.display = 'none';
        inputLinkImage.style.display = 'none';
        addImage.style.display = 'block';
        inputLinkImage.value = '';
    }
    initCategoryBox() {
        const boxImageBot = document.getElementById('box-image-bot');
        const boxCategory = document.getElementById('box-category');
        boxImageBot.addEventListener('click', () => {
            boxCategory.style.display = 'flex';
        });

        boxCategory.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-option')) {
                const image = boxImageBot.querySelector('img');
                image.src = '/my-photos/icon-2.png';
                boxImageBot.querySelector('span').textContent =
                    e.target.innerText;
                newCategory = e.target.innerText;
                boxCategory.style.display = 'none';
            }
        });

        // Đóng box khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (
                !boxImageBot.contains(e.target) &&
                !boxCategory.contains(e.target)
            ) {
                boxCategory.style.display = 'none';
            }
        });
    }

    resetCategoryBox() {
        boxImageBot.querySelector('img').src = '/my-photos/add-category.png';
        boxImageBot.querySelector('span').textContent = 'New category';
        boxCategory.innerHTML = `
      <li class="category-option">Option 1</li>
      <li class="category-option">Option 2</li>
      <li class="category-option">Option 3</li>
      <li class="category-option">Option 4</li>
      <li class="category-option">Option 5</li>
    `;
        this.initCategoryBox();
    }
    resetBasicInformation() {
        this.basicInformation = {};
        document.querySelectorAll('.form').forEach((form) => {
            const valueDiv = form.querySelector('.editable-field');
            // Nếu có thẻ .editable-field, bạn cũng cần làm mới nó
            if (valueDiv) {
                valueDiv.textContent = ''; // Reset các thẻ hiển thị thông tin
            }
        });
    }
    resetListIngredient() {
        listIngredient.innerHTML = '';
        this.nutritionPortion = [];
    }
    // Thêm một block mới vào giao diện
    addBlock() {
        const block = this.template.cloneNode(true);
        block.style.display = 'flex';

        // Đếm số block đang hiển thị để tính STT
        const index =
            this.container.querySelectorAll(
                '.a-cooking-method[style*="display: flex"]'
            ).length + 1;

        // Reset nội dung block mới
        block.querySelector('.stt').textContent = index;
        block.querySelector('.method').innerHTML =
            '<em>Add new cooking method</em>';
        block.querySelector('.method-input').value = '';
        block.querySelector('.method').style.display = 'block';
        block.querySelector('.method-input').style.display = 'none';

        // Gắn block vào DOM và thêm sự kiện
        this.container.appendChild(block);
        this.attachEvents(block);
    }
    // Gắn sự kiện click và nhập Enter cho mỗi block
    attachEvents(block) {
        const method = block.querySelector('.method');
        const input = block.querySelector('.method-input');
        const icon = block.querySelector('.icon-write img');

        // Khi bấm vào icon, chuyển sang input để chỉnh sửa
        icon.onclick = () => {
            method.style.display = 'none';
            input.style.display = 'inline-block';
            input.value = method.textContent.trim();
            input.focus();
        };

        // Khi nhấn Enter: lưu dữ liệu, ẩn input, hiển thị text, thêm block mới
        input.onkeypress = (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                const value = input.value.trim();

                method.innerHTML = value;
                method.style.display = 'block';
                input.style.display = 'none';

                // Lưu dữ liệu vào mảng
                this.listCookingMethod.push(value);
                // Kiểm tra nếu đây là block cuối cùng thì mới thêm block mới
                const allBlocks = this.container.querySelectorAll(
                    '.a-cooking-method[style*="display: flex"]'
                );
                const isLastBlock =
                    allBlocks[allBlocks.length - 1].querySelector(
                        '.method-input'
                    ) === input;

                if (isLastBlock) {
                    this.addBlock();
                }
            }
        };
    }
    resetCookingMethods() {
        // Xoá hết các block hiện có
        this.container.innerHTML = '';
        // Reset mảng lưu phương pháp nấu nếu có
        this.listCookingMethod = [];
        // Gọi lại addBlock để thêm block đầu tiên
        this.addBlock();
    }

    search() {
        this.searchQuery = searchFood_1.value.trim().toLowerCase();
        this.filterSortAndPaginate();
    }
    renderPagination(totalPages) {
        let paginationDiv = document.getElementById('pagination-1');
        paginationDiv.innerHTML = '';

        let preBtn = document.createElement('button');
        preBtn.className = 'page start';
        preBtn.disabled = this.currentPage === 1;
        preBtn.innerHTML = `<i class="fa-solid fa-backward pre-btn"></i>`;

        preBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.filterSortAndPaginate();
            }
        });
        paginationDiv.appendChild(preBtn);

        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(this.currentPage + 2, totalPages);

        if (startPage > 1) {
            let ellipsis = document.createElement('button');
            ellipsis.className = 'page ellipsis';
            ellipsis.innerText = '...';
            paginationDiv.appendChild(ellipsis);
        }

        for (let i = startPage; i <= endPage; i++) {
            let pageBtn = document.createElement('button');
            pageBtn.className = 'page';
            if (this.currentPage === i) pageBtn.classList.add('active');
            pageBtn.innerText = i;

            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.filterSortAndPaginate();
            });
            paginationDiv.appendChild(pageBtn);
        }

        if (endPage < totalPages) {
            let ellipsis = document.createElement('button');
            ellipsis.className = 'page ellipsis';
            ellipsis.innerText = '...';
            paginationDiv.appendChild(ellipsis);
        }

        let nextBtn = document.createElement('button');
        nextBtn.className = 'page';
        nextBtn.disabled = this.currentPage >= totalPages;
        nextBtn.innerHTML = `<i class="fa-solid fa-forward next-btn"></i>`;

        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.filterSortAndPaginate();
            }
        });
        paginationDiv.appendChild(nextBtn);
    }

    sortByEachNutrient(array) {
        const direction = this.isAscending ? 1 : -1;

        const nutrientValues = {
            overall: (item) => item.overall(),
            fat: (item) => item.fat,
            protein: (item) => item.protein,
            carbohydrate: (item) => item.carbohydrate,
            energy: (item) => item.energy,
        };

        array.sort(
            (a, b) =>
                direction *
                (nutrientValues[this.nutrient](a) -
                    nutrientValues[this.nutrient](b))
        );
    }

    typeSort() {
        if (sortIcon_1.classList.contains('fa-arrow-up-wide-short')) {
            sortIcon_1.classList.remove('fa-arrow-up-wide-short');
            sortIcon_1.classList.add('fa-arrow-up-short-wide');
            this.isAscending = false;
            this.filterSortAndPaginate();
        } else {
            sortIcon_1.classList.remove('fa-arrow-up-short-wide');
            sortIcon_1.classList.add('fa-arrow-up-wide-short');
            this.isAscending = true;
            this.filterSortAndPaginate();
        }
    }

    filterSortAndPaginate() {
        let filteredArray = this.ingredients;

        // Bước 1: Lọc dữ liệu theo các điều kiện
        if (this.searchQuery && this.selectedCategory) {
            filteredArray = filteredArray.filter(
                (item) =>
                    item.category === this.selectedCategory &&
                    item.name.toLowerCase().includes(this.searchQuery)
            );
        } else if (this.selectedCategory) {
            filteredArray = filteredArray.filter(
                (item) => item.category === this.selectedCategory
            );
        } else if (this.searchQuery) {
            filteredArray = filteredArray.filter((item) =>
                item.name.toLowerCase().includes(this.searchQuery)
            );
        }

        // Bước 2: Sắp xếp dữ liệu
        this.sortByEachNutrient(filteredArray);

        // Bước 3: Phân trang

        let totalPages = Math.ceil(filteredArray.length / this.itemsPerPage);
        this.currentPage = Math.min(this.currentPage, totalPages) || 1;
        let start = this.itemsPerPage * (this.currentPage - 1);
        let end = this.itemsPerPage * this.currentPage;
        let paginatedArray = filteredArray.slice(start, end);

        // Bước 4: Render lại dữ liệu
        this.renderCard(paginatedArray);
        this.renderPagination(totalPages);
    }

    filterCategory() {
        this.ingredients.forEach((item) => {
            if (!this.uniqueCategories.includes(item.category)) {
                this.uniqueCategories.push(item.category);
            }
        });

        selectCategory_1.innerHTML = `<option value='' selected >All category</option>`;
        this.uniqueCategories.forEach((category) => {
            let option = document.createElement('option');
            option.value = category;
            option.innerText = category;
            selectCategory_1.appendChild(option);
        });

        selectCategory_1.addEventListener('change', (event) => {
            this.selectedCategory = event.target.value;
            this.filterSortAndPaginate();
        });
    }

    renderCard(array) {
        listCardIngredient.innerHTML = '';
        array.forEach((card, index) => {
            // Tạo id an toàn từ tên nguyên liệu (loại bỏ dấu cách, viết thường)
            const safeId = card.name.replace(/\s+/g, '-').toLowerCase();

            let cardIngredient = document.createElement('div');
            cardIngredient.className = 'card-ingredient';

            cardIngredient.innerHTML = `
            <div class="box-1a">
                <div class="line-1">${card.name}</div>
                 <div class="line-2">Community Recipes</div>
                <div class="line-3">
                    <input type="text" value="1" class="line-3a" id="input-${safeId}" />
                    <div class="line-3b">portion (${card.quantity} grams)</div>
                     <div class="line-3c">${card.quantity} g</div>
                 </div>
             </div>
             <div class="box-2a">${card.energy} kcal</div>
             <div class="box-2a">${card.fat} g</div>
             <div class="box-2a">${card.carbohydrate} g</div>
             <div class="box-2a">${card.protein} g</div>
            `;

            let areaAddIngredient = document.createElement('div');
            areaAddIngredient.className = 'box-3a';
            areaAddIngredient.innerHTML = `<i class="fa-solid fa-plus"></i>`;

            areaAddIngredient.addEventListener('click', () => {
                // Lấy ô input theo id an toàn
                const input = document.getElementById(`input-${safeId}`);
                const quantity = parseInt(input.value);
                // Kiểm tra giá trị hợp lệ
                if (!isNaN(quantity) && quantity > 0) {
                    // Kiểm tra xem nguyên liệu đã có trong mảng chưa
                    const existing = this.nutritionPortion.find(
                        (item) => item.data.name === card.name
                    );
                    if (existing) {
                        // Nếu đã tồn tại → cộng thêm số lượng
                        existing.quantity += quantity;
                    } else {
                        // Nếu chưa tồn tại → thêm mới
                        this.nutritionPortion.push({
                            quantity: quantity,
                            data: card,
                        });
                    }
                }
                this.renderList(this.nutritionPortion);
                this.getFinalWeight();
                this.getMacronutrient();
            });
            cardIngredient.appendChild(areaAddIngredient);
            listCardIngredient.appendChild(cardIngredient);
        });
    }

    renderList(array) {
        listIngredient.innerHTML = '';
        array.forEach((item) => {
            let anIngredient = document.createElement('div');
            anIngredient.className = 'an-ingredient';
            anIngredient.innerHTML = `<div class="ingredient-content">
                 ${item.quantity} ${item.data.name} (${item.data.quantity} g)
            </div>`;

            let deleteIngredient = document.createElement('div');
            deleteIngredient.className = 'delete-ingredient';
            deleteIngredient.innerHTML = `<i class="fa-solid fa-trash"></i>`;

            deleteIngredient.addEventListener('click', () => {
                const index = this.nutritionPortion.findIndex(
                    (ing) => ing.data.name === item.data.name
                );
                if (index !== -1) {
                    Swal.fire({
                        title: 'Xác nhận xoá?',
                        text: `Bạn có chắc muốn xoá ${item.data.name}?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Xoá',
                        cancelButtonText: 'Huỷ',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.nutritionPortion.splice(index, 1);
                            this.renderList(this.nutritionPortion);
                            this.getFinalWeight();
                            this.getMacronutrient();
                        }
                    });
                }
            });
            anIngredient.appendChild(deleteIngredient);
            listIngredient.appendChild(anIngredient);
        });
    }

    getTotalBy(key) {
        return this.nutritionPortion.reduce((total, item) => {
            return total + item.quantity * item.data[key];
        }, 0);
    }
    getFinalWeight() {
        let finalWeight = document.getElementById('final-weight');
        finalWeight.innerText = this.getTotalBy('quantity') + ' g';
        this.updateBasicInformation();
    }
    getBasicInformation() {
        // Lặp qua tất cả các form
        document.querySelectorAll('.form').forEach((form) => {
            const label = form.querySelector('div:first-child'); // Lấy label (div đầu tiên)
            const valueDiv = form.querySelector('.editable-field'); // Lấy div chứa giá trị hiện tại
            const input = form.querySelector('.editable-field-input'); // Lấy input ẩn
            const editIcon = form.querySelector('.icon-edit img'); // Lấy icon chỉnh sửa

            // Khi nhấn vào icon sửa
            editIcon.addEventListener('click', () => {
                input.value = valueDiv.textContent
                    .replace(/\n/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim(); // Lấy giá trị hiện tại từ div và gán vào input
                // Ẩn div và hiển thị input
                valueDiv.style.display = 'none';
                input.style.display = 'flex';
                input.focus(); // Đặt focus vào input
            });
            // Khi input mất focus hoặc người dùng nhấn Enter
            input.addEventListener('blur', () => {
                valueDiv.textContent = input.value.trim(); // Cập nhật giá trị cho div
                valueDiv.style.display = 'flex'; // Hiển thị lại div
                input.style.display = 'none'; // Ẩn input
                // Cập nhật vào đối tượng basicInformation với key là nội dung label
                this.basicInformation[label.textContent] = input.value;
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    valueDiv.textContent = input.value.trim(); // Cập nhật giá trị cho div
                    valueDiv.style.display = 'flex'; // Hiển thị lại div
                    input.style.display = 'none'; // Ẩn input

                    // Cập nhật vào đối tượng basicInformation với key là nội dung label
                    this.basicInformation[label.textContent] = input.value;
                }
            });
            // Cập nhật giá trị ban đầu khi trang tải
            this.basicInformation[label.textContent] = valueDiv.textContent
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        });
    }
    updateBasicInformation() {
        document.querySelectorAll('.form').forEach((form) => {
            const label = form.querySelector('div:first-child');
            const valueDiv = form.querySelector('.editable-field');
            this.basicInformation[label.textContent] = valueDiv.textContent;
        });
    }
    getMacronutrient() {
        let energyTotal = document.getElementById('total-energy');
        energyTotal.innerText = this.getTotalBy('energy') + ' kcal';

        document.getElementById('total-fat').innerText =
            this.getTotalBy('fat').toFixed(1) + 'g';
        if (this.getTotalBy('fat') > 0) {
            document
                .getElementById('outer-circle-fat')
                .classList.add('fat-color');
        } else {
            document
                .getElementById('outer-circle-fat')
                .classList.remove('fat-color');
        }

        document.getElementById('total-carbohydrate').innerText =
            this.getTotalBy('carbohydrate').toFixed(1) + 'g';
        if (this.getTotalBy('carbohydrate') > 0) {
            document
                .getElementById('outer-circle-carbohydrate')
                .classList.add('carbohydrate-color');
        } else {
            document
                .getElementById('outer-circle-carbohydrate')
                .classList.remove('carbohydrate-color');
        }

        document.getElementById('total-protein').innerText =
            this.getTotalBy('protein').toFixed(1) + 'g';
        if (this.getTotalBy('protein') > 0) {
            document
                .getElementById('outer-circle-protein')
                .classList.add('protein-color');
        } else {
            document
                .getElementById('outer-circle-protein')
                .classList.remove('protein-color');
        }

        document.getElementById('total-fiber').innerText =
            this.getTotalBy('fiber').toFixed(1) + 'g';
        if (this.getTotalBy('fiber') > 0) {
            document
                .getElementById('outer-circle-fiber')
                .classList.add('fiber-color');
        } else {
            document
                .getElementById('outer-circle-fiber')
                .classList.remove('fiber-color');
        }
        this.computeValues();
        this.getMicronutrient();
    }
    computeValues() {
        let protein =
            (this.getTotalBy('protein') / this.getTotalBy('energy')) * 4 * 100;
        let carbohydrate =
            ((this.getTotalBy('carbohydrate') - this.getTotalBy('fiber')) /
                this.getTotalBy('energy')) *
            4 *
            100;
        let fat =
            (this.getTotalBy('fat') / this.getTotalBy('energy')) * 9 * 100;
        protein = protein.toFixed(2);
        fat = fat.toFixed(2);
        carbohydrate = carbohydrate.toFixed(2);
        this.drawChart(protein, carbohydrate, fat);
    }
    drawChart(protein, carbs, fat) {
        const ctx = document.getElementById('myPieChart').getContext('2d');

        // 👉 Hủy biểu đồ cũ nếu có
        if (this.myChart) {
            this.myChart.destroy();
        }

        const data = {
            labels: ['Protein', 'Carbohydrate', 'Fat'],
            datasets: [
                {
                    label: 'Nutrition Percent',
                    data: [protein, carbs, fat],
                    backgroundColor: [
                        'rgb(13, 161, 131)',
                        'rgba(234, 159, 119, 1)',
                        'rgb(222, 53, 53)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: false, // Tắt responsive
                maintainAspectRatio: false, // Không giữ tỉ lệ gốc
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let value = context.raw || 0;
                                return `${label}: ${value}%`;
                            },
                        },
                    },
                    datalabels: {
                        formatter: (value) => `${value}%`,
                        color: '#fff',
                    },
                },
            },
            plugins: [ChartDataLabels],
        };

        // 👉 Lưu lại biểu đồ hiện tại để hủy lần sau
        this.myChart = new Chart(ctx, config);
    }
    getMicronutrient() {
        const keyToId = {
            cholesterol: 'total-cholesterol',
            sodium: 'total-sodium',
            water: 'total-water',
            vitaminA: 'total-vitamin-A',
            vitaminB6: 'total-vitamin-B-6',
            vitaminB12: 'total-vitamin-B-12',
            vitaminC: 'total-vitamin-C',
            vitaminD: 'total-vitamin-D',
            vitaminE: 'total-vitamin-E',
            vitaminK: 'total-vitamin-K',
            starch: 'total-starch',
            lactose: 'total-lactose',
            alcohol: 'total-alcohol',
            caffeine: 'total-caffeine',
            sugars: 'total-sugars',
            calcium: 'total-calcium',
            iron: 'total-iron',
            magnesium: 'total-magnesium',
            phosphorus: 'total-phosphorus',
            potassium: 'total-potassium',
            zinc: 'total-zinc',
            copper: 'total-copper',
            fluoride: 'total-fluoride',
            manganese: 'total-manganese',
            selenium: 'total-selenium',
            thiamin: 'total-thiamin',
            riboflavin: 'total-riboflavin',
            niacin: 'total-niacin',
            pantothenic: 'total-pantothenic-acid',
            folate: 'total-folate',
            folic: 'total-folic',
            fattyTrans: 'total-fattyTrans',
            fattySaturated: 'total-fattySaturated',
            fattyMonounsaturated: 'total-fattyMonounsaturated',
            fattyPolyunsaturated: 'total-fattyPolyunsaturated',
            chloride: 'total-chloride',
        };

        Object.entries(keyToId).forEach(([key, id]) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = formatNumber_1(this.getTotalBy(key));
            }
        });
    }
    resetMicronutrient() {
        const keyToId = {
            cholesterol: 'total-cholesterol',
            sodium: 'total-sodium',
            water: 'total-water',
            vitaminA: 'total-vitamin-A',
            vitaminB6: 'total-vitamin-B-6',
            vitaminB12: 'total-vitamin-B-12',
            vitaminC: 'total-vitamin-C',
            vitaminD: 'total-vitamin-D',
            vitaminE: 'total-vitamin-E',
            vitaminK: 'total-vitamin-K',
            starch: 'total-starch',
            lactose: 'total-lactose',
            alcohol: 'total-alcohol',
            caffeine: 'total-caffeine',
            sugars: 'total-sugars',
            calcium: 'total-calcium',
            iron: 'total-iron',
            magnesium: 'total-magnesium',
            phosphorus: 'total-phosphorus',
            potassium: 'total-potassium',
            zinc: 'total-zinc',
            copper: 'total-copper',
            fluoride: 'total-fluoride',
            manganese: 'total-manganese',
            selenium: 'total-selenium',
            thiamin: 'total-thiamin',
            riboflavin: 'total-riboflavin',
            niacin: 'total-niacin',
            pantothenic: 'total-pantothenic-acid',
            folate: 'total-folate',
            folic: 'total-folic',
            fattyTrans: 'total-fattyTrans',
            fattySaturated: 'total-fattySaturated',
            fattyMonounsaturated: 'total-fattyMonounsaturated',
            fattyPolyunsaturated: 'total-fattyPolyunsaturated',
            chloride: 'total-chloride',
        };

        Object.entries(keyToId).forEach(([key, id]) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = 0;
            }
        });
    }
    resetMacronutrient() {
        let energyTotal = document.getElementById('total-energy');
        energyTotal.innerText = 0 + ' kcal';

        document.getElementById('total-fat').innerText = 0 + 'g';
        document
            .getElementById('outer-circle-fat')
            .classList.remove('fat-color');

        document.getElementById('total-carbohydrate').innerText = 0 + 'g';
        document
            .getElementById('outer-circle-carbohydrate')
            .classList.remove('carbohydrate-color');

        document.getElementById('total-protein').innerText = 0 + 'g';
        document
            .getElementById('outer-circle-protein')
            .classList.remove('protein-color');

        document.getElementById('total-fiber').innerText = 0 + 'g';
        document
            .getElementById('outer-circle-fiber')
            .classList.remove('fiber-color');
    }
    getTotalBySecond(array, key) {
        return array.reduce((total, item) => {
            return total + item.quantity * item.data[key];
        }, 0);
    }
    showDetail(nameRecipe) {
        const cardRecipe = this.recipe.find(
            (temp) => temp.nameRecipe === nameRecipe
        );

        const keyToId = {
            cholesterol: 'total-cholesterol-1',
            sodium: 'total-sodium-1',
            water: 'total-water-1',
            vitaminA: 'total-vitamin-A-1',
            vitaminB6: 'total-vitamin-B-6',
            vitaminB12: 'total-vitamin-B-12-1',
            vitaminC: 'total-vitamin-C-1',
            vitaminD: 'total-vitamin-D-1',
            vitaminE: 'total-vitamin-E-1',
            vitaminK: 'total-vitamin-K-1',
            starch: 'total-starch-1',
            lactose: 'total-lactose-1',
            alcohol: 'total-alcohol-1',
            caffeine: 'total-caffeine-1',
            sugars: 'total-sugars-1',
            calcium: 'total-calcium-1',
            iron: 'total-iron-1',
            magnesium: 'total-magnesium-1',
            phosphorus: 'total-phosphorus-1',
            potassium: 'total-potassium-1',
            zinc: 'total-zinc-1',
            copper: 'total-copper-1',
            fluoride: 'total-fluoride-1',
            manganese: 'total-manganese-1',
            selenium: 'total-selenium-1',
            thiamin: 'total-thiamin-1',
            riboflavin: 'total-riboflavin-1',
            niacin: 'total-niacin-1',
            pantothenic: 'total-pantothenic-acid-1',
            folate: 'total-folate-1',
            folic: 'total-folic-1',
            fattyTrans: 'total-fattyTrans-1',
            fattySaturated: 'total-fattySaturated-1',
            fattyMonounsaturated: 'total-fattyMonounsaturated-1',
            fattyPolyunsaturated: 'total-fattyPolyunsaturated-1',
            chloride: 'total-chloride-1',
        };

        Object.entries(keyToId).forEach(([key, id]) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = formatNumber_1(
                    this.getTotalBySecond(cardRecipe.listNutrition, key)
                );
            }
        });

        const nutrients = [
            { key: 'energy', unit: 'kcal', isCircle: false },
            { key: 'fat', unit: 'g', color: 'fat-color' },
            { key: 'carbohydrate', unit: 'g', color: 'carbohydrate-color' },
            { key: 'protein', unit: 'g', color: 'protein-color' },
            { key: 'fiber', unit: 'g', color: 'fiber-color' },
        ];

        nutrients.forEach((nutrient) => {
            const value = this.getTotalBySecond(
                cardRecipe.listNutrition,
                nutrient.key
            );
            const valueFormatted =
                nutrient.key === 'energy' ? value : value.toFixed(1);
            document.getElementById(`total-${nutrient.key}-1`).innerText =
                valueFormatted + ' ' + nutrient.unit;

            if (nutrient.isCircle === false) return;

            const circle = document.getElementById(
                `outer-circle-${nutrient.key}-1`
            );
            if (value > 0) {
                circle.classList.add(nutrient.color);
            } else {
                circle.classList.remove(nutrient.color);
            }
        });

        imageRecipe_1.src = cardRecipe.image;
        nameRecipe_1.innerText = cardRecipe.nameRecipe;
        description_1.innerText = cardRecipe.description;
        author_1.innerText = cardRecipe.author;
        totalTime_1.innerText = cardRecipe.totalTime.replace(/\n/g, '');
        preparationTime_1.innerText = cardRecipe.preparationTime.replace(
            /\n/g,
            ''
        );
        finalWeight_1.innerText = cardRecipe.finalWeight;
        portion_1.innerText = cardRecipe.portions.replace(/\n/g, '');
        this.renderListSecond(cardRecipe.listNutrition);
        this.renderListCookingMethod(cardRecipe.listMethod);

        const nutrition = {
            energy: this.getTotalBySecond(cardRecipe.listNutrition, 'energy'),
            protein: this.getTotalBySecond(cardRecipe.listNutrition, 'protein'),
            carbohydrate: this.getTotalBySecond(
                cardRecipe.listNutrition,
                'carbohydrate'
            ),
            fiber: this.getTotalBySecond(cardRecipe.listNutrition, 'fiber'),
            fat: this.getTotalBySecond(cardRecipe.listNutrition, 'fat'),
        };

        const protein = parseFloat(
            ((nutrition.protein / nutrition.energy) * 4 * 100).toFixed(2)
        );
        const carbohydrate = parseFloat(
            (
                ((nutrition.carbohydrate - nutrition.fiber) /
                    nutrition.energy) *
                4 *
                100
            ).toFixed(2)
        );
        const fat = parseFloat(
            ((nutrition.fat / nutrition.energy) * 9 * 100).toFixed(2)
        );

        this.drawChartSecond(protein, carbohydrate, fat);
        nameCategory_1.innerText = cardRecipe.categoryRecipe;

        const name = cardRecipe.nameRecipe;
        if (this.recipeFavorite.includes(name)) {
            iconFavorite.classList.add('favorited');
        } else {
            iconFavorite.classList.remove('favorited');
        }

        iconFavorite.onclick = (e) => {
            e.stopPropagation();
            const isFavorited = iconFavorite.classList.contains('favorited');
            if (isFavorited) {
                iconFavorite.classList.remove('favorited');
                const index = this.recipeFavorite.indexOf(name);
                if (index !== -1) this.recipeFavorite.splice(index, 1);
            } else {
                iconFavorite.classList.add('favorited');
                this.recipeFavorite.push(name);
            }

            this.accounts.recipeFavorite = this.recipeFavorite;
            numberFavorite.innerText = this.recipeFavorite.length;
            saveAccount(this.accounts);
        };
    }
    renderListSecond(array) {
        listIngredient_1.innerHTML = '';
        array.forEach((item) => {
            let anIngredient = document.createElement('div');
            anIngredient.className = 'an-ingredient';
            anIngredient.innerHTML = `<div class="ingredient-content-1">
                 ${item.quantity} ${item.data.name} (${item.data.quantity} g)
            </div>`;
            listIngredient_1.appendChild(anIngredient);
        });
    }
    renderListCookingMethod(array) {
        listCookingMethod_1.innerHTML = '';
        array.forEach((temp, index) => {
            let aCookingMethod = document.createElement('div');
            aCookingMethod.className = 'a-cooking-method';
            aCookingMethod.innerHTML = `
            <div class="stt-1">${index + 1}</div>
            <div class="method-1">${temp}</div>
            `;
            listCookingMethod_1.appendChild(aCookingMethod);
        });
    }
    drawChartSecond(protein, carbs, fat) {
        const ctx = document.getElementById('myPieChart-1').getContext('2d');

        // 👉 Hủy biểu đồ cũ nếu có
        if (this.myChart) {
            this.myChart.destroy();
        }

        const data = {
            labels: ['Protein', 'Carbohydrate', 'Fat'],
            datasets: [
                {
                    label: 'Nutrition Percent',
                    data: [protein, carbs, fat],
                    backgroundColor: [
                        'rgb(13, 161, 131)',
                        'rgba(234, 159, 119, 1)',
                        'rgb(222, 53, 53)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: false, // Tắt responsive
                maintainAspectRatio: false, // Không giữ tỉ lệ gốc
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let value = context.raw || 0;
                                return `${label}: ${value}%`;
                            },
                        },
                    },
                    datalabels: {
                        formatter: (value) => `${value}%`,
                        color: '#fff',
                    },
                },
            },
            plugins: [ChartDataLabels],
        };

        // 👉 Lưu lại biểu đồ hiện tại để hủy lần sau
        this.myChart = new Chart(ctx, config);
    }
}

let temp = new ManagerIngredient();
