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
let searchFood = document.getElementById('search');
let selectCategory = document.getElementById('filter-category');
let arrowIcon = document.getElementsByClassName('fa-arrow-up-wide-short');
let sortIcon = arrowIcon[0];
let sortNutrient = document.getElementById('select-sort');

let listIngredient = document.getElementById('list-ingredient');
console.log(listIngredient);

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
        this.nutritionPortion = [];
        this.basicInformation = {}; // Đối tượng để lưu thông tin
        this.getBasicInformation();
        //bộ code sắp xếp+ lọc+tìm kiếm+phân trang
        if (searchFood) {
            let timeout;
            searchFood.addEventListener('input', () => {
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
        sortIcon.addEventListener('click', () => {
            this.typeSort();
        });
        sortNutrient.addEventListener('change', (event) => {
            this.nutrient = event.target.value;
            this.filterSortAndPaginate();
        });
        this.currentArray = [];
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.filterSortAndPaginate();
    }
    search() {
        this.searchQuery = searchFood.value.trim().toLowerCase();
        this.filterSortAndPaginate();
    }
    renderPagination(totalPages) {
        let paginationDiv = document.getElementById('pagination');
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
        if (sortIcon.classList.contains('fa-arrow-up-wide-short')) {
            sortIcon.classList.remove('fa-arrow-up-wide-short');
            sortIcon.classList.add('fa-arrow-up-short-wide');
            this.isAscending = false;
            this.filterSortAndPaginate();
        } else {
            sortIcon.classList.remove('fa-arrow-up-short-wide');
            sortIcon.classList.add('fa-arrow-up-wide-short');
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

        selectCategory.innerHTML = `<option value='' selected >All category</option>`;
        this.uniqueCategories.forEach((category) => {
            let option = document.createElement('option');
            option.value = category;
            option.innerText = category;
            selectCategory.appendChild(option);
        });

        selectCategory.addEventListener('change', (event) => {
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
        console.log(this.basicInformation);
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
                this.basicInformation[label.textContent] = input.value;
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    valueDiv.textContent = input.value; // Cập nhật giá trị cho div
                    valueDiv.style.display = 'block'; // Hiển thị lại div
                    input.style.display = 'none'; // Ẩn input

                    // Cập nhật vào đối tượng basicInformation với key là nội dung label
                    this.basicInformation[label.textContent] = input.value;
                }
            });
            // Cập nhật giá trị ban đầu khi trang tải
            this.basicInformation[label.textContent] = valueDiv.textContent;
        });
    }
    updateBasicInformation() {
        document.querySelectorAll('.form').forEach((form) => {
            const label = form.querySelector('div:first-child');
            const valueDiv = form.querySelector('.editable-field');
            this.basicInformation[label.textContent] = valueDiv.textContent;
        });
    }
}
let temp = new ManagerIngredient();
