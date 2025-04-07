let addFood = document.getElementById('icon-add');

let overlay = document.getElementById('overlay');

let boxAddFood = document.getElementById('add-food');

let closeBtn = document.getElementById('close');
let closeBtn2 = document.getElementById('close-2');

let cancelBtn = document.getElementById('cancel');
let editBtn = document.getElementById('edit');
let deleteBtn = document.getElementById('delete');

let collection = document.getElementById('collection-2');

let overlay2 = document.getElementById('overlay-2');

addFood.addEventListener('click', () => {
    overlay.style.display = 'flex';
    boxAddFood.style.display = 'none';
});
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    boxAddFood.style.display = 'flex';
});
closeBtn2.addEventListener('click', () => {
    overlay2.style.display = 'none';
    boxAddFood.style.display = 'flex';
});
cancelBtn.addEventListener('click', () => {
    if (
        window.confirm(
            'Bạn chắc chắn muốn hủy thêm nguyên liệu ? Dữ liệu sẽ mất và không được lưu !'
        )
    ) {
        overlay.style.display = 'none';
        boxAddFood.style.display = 'flex';
    }
});

let saveAndCloseBtn = document.getElementById('save-and-close');

let searchFood = document.getElementById('search');
let selectCategory = document.getElementById('filter-category');
let arrowIcon = document.getElementsByClassName('fa-arrow-up-wide-short');
let sortIcon = arrowIcon[0];
let sortNutrient = document.getElementById('select-sort');

function save(array) {
    localStorage.setItem('Ingredient', JSON.stringify(array));
}
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

        save(this.ingredients);
        saveAndCloseBtn.addEventListener('click', () => {
            this.addAndEditing();
        });
        this.editingIndex = null;

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
        this.itemsPerPage = 2;
        this.currentPage = 1;
        this.filterSortAndPaginate();
    }

    filterCategory() {
        this.ingredients.forEach((item) => {
            if (!this.uniqueCategories.includes(item.category)) {
                this.uniqueCategories.push(item.category);
            }
        });

        selectCategory.innerHTML = `<option value='' selected >Choose category</option>`;
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
        console.log('Current nutrient:', this.nutrient);

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
        console.log('hello');

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
        this.render(paginatedArray);
        this.renderPagination(totalPages);
    }

    addAndEditing() {
        const inputIds = [
            'input-name',
            'input-source',
            'input-category',
            'input-quantity',
            'input-energy',
            'input-fat',
            'input-carbohydrate',
            'input-protein',
            'input-cholesterol',
            'input-fiber',
            'input-sodium',
            'input-water',
            'input-vitamin-A',
            'input-vitamin-B-6',
            'input-vitamin-B-12',
            'input-vitamin-C',
            'input-vitamin-D',
            'input-vitamin-E',
            'input-vitamin-K',
            'input-starch',
            'input-lactose',
            'input-alcohol',
            'input-caffeine',
            'input-sugars',
            'input-calcium',
            'input-iron',
            'input-magnesium',
            'input-phosphorus',
            'input-potassium',
            'input-zinc',
            'input-copper',
            'input-fluoride',
            'input-manganese',
            'input-selenium',
            'input-thiamin',
            'input-riboflavin',
            'input-niacin',
            'input-pantothenic',
            'input-folate',
            'input-folic',
            'input-fatty-trans',
            'input-fatty-saturated',
            'input-fatty-monounsaturated',
            'input-fatty-polyunsaturated',
            'input-chloride',
        ];

        let isValid = true;
        let values = [];

        document
            .querySelectorAll('.error')
            .forEach((el) => el.classList.remove('error'));

        inputIds.forEach((id, index) => {
            let inputElement = document.getElementById(id);

            let value = inputElement.value.trim();

            if (index < 3) {
                // ✅ 3 giá trị đầu phải là chuỗi, không được để trống
                if (value === '') {
                    inputElement.classList.add('error');
                    isValid = false;
                }
                values.push(value);
            } else {
                // ✅ Các giá trị còn lại phải là số, nếu rỗng hoặc không phải số thì báo lỗi
                let numberValue = value === '' ? NaN : Number(value);
                if (isNaN(numberValue)) {
                    inputElement.classList.add('error');
                    isValid = false;
                }
                values.push(numberValue);
            }
        });

        if (!isValid) {
            alert('Vui lòng nhập đúng thông tin!');
            return;
        }
        if (this.editingIndex !== null) {
            document.getElementById('save-and-close').innerText = 'Update';
            this.ingredients[this.editingIndex] = new Ingredient(...values);
            this.editingIndex = null;
            alert('Đã cập nhật nguyên liệu thành công!');
            document.getElementById('save-and-close').innerText =
                'Save and Close';
        } else {
            this.ingredients.push(new Ingredient(...values));
            alert('Đã thêm nguyên liệu thành công!');
        }

        overlay.style.display = 'none';
        boxAddFood.style.display = 'flex';

        inputIds.forEach((id) => {
            document.getElementById(id).value = '';
        });
        this.filterSortAndPaginate();
        // Lưu lại danh sách nguyên liệu vào localStorage
        save(this.ingredients);
    }

    editIngredient(index) {
        let ingredient = this.ingredients[index];
        overlay2.style.display = 'none';
        overlay.style.display = 'flex';
        boxAddFood.style.display = 'none';
        // Gán giá trị cho các input theo thông tin nguyên liệu
        document.getElementById('input-name').value = ingredient.name;
        document.getElementById('input-source').value = ingredient.source;
        document.getElementById('input-category').value = ingredient.category;
        document.getElementById('input-quantity').value = ingredient.quantity;
        document.getElementById('input-energy').value = ingredient.energy;
        document.getElementById('input-fat').value = ingredient.fat;
        document.getElementById('input-carbohydrate').value =
            ingredient.carbohydrate;
        document.getElementById('input-protein').value = ingredient.protein;
        document.getElementById('input-cholesterol').value =
            ingredient.cholesterol;
        document.getElementById('input-fiber').value = ingredient.fiber;
        document.getElementById('input-sodium').value = ingredient.sodium;
        document.getElementById('input-water').value = ingredient.water;
        document.getElementById('input-vitamin-A').value = ingredient.vitaminA;
        document.getElementById('input-vitamin-B-6').value =
            ingredient.vitaminB6;
        document.getElementById('input-vitamin-B-12').value =
            ingredient.vitaminB12;
        document.getElementById('input-vitamin-C').value = ingredient.vitaminC;
        document.getElementById('input-vitamin-D').value = ingredient.vitaminD;
        document.getElementById('input-vitamin-E').value = ingredient.vitaminE;
        document.getElementById('input-vitamin-K').value = ingredient.vitaminK;
        document.getElementById('input-starch').value = ingredient.starch;
        document.getElementById('input-lactose').value = ingredient.lactose;
        document.getElementById('input-alcohol').value = ingredient.alcohol;
        document.getElementById('input-caffeine').value = ingredient.caffeine;
        document.getElementById('input-sugars').value = ingredient.sugars;
        document.getElementById('input-calcium').value = ingredient.calcium;
        document.getElementById('input-iron').value = ingredient.iron;
        document.getElementById('input-magnesium').value = ingredient.magnesium;
        document.getElementById('input-phosphorus').value =
            ingredient.phosphorus;
        document.getElementById('input-potassium').value = ingredient.potassium;
        document.getElementById('input-zinc').value = ingredient.zinc;
        document.getElementById('input-copper').value = ingredient.copper;
        document.getElementById('input-fluoride').value = ingredient.fluoride;
        document.getElementById('input-manganese').value = ingredient.manganese;
        document.getElementById('input-selenium').value = ingredient.selenium;
        document.getElementById('input-thiamin').value = ingredient.thiamin;
        document.getElementById('input-riboflavin').value =
            ingredient.riboflavin;
        document.getElementById('input-niacin').value = ingredient.niacin;
        document.getElementById('input-pantothenic').value =
            ingredient.pantothenic;
        document.getElementById('input-folate').value = ingredient.folate;
        document.getElementById('input-folic').value = ingredient.folic;
        document.getElementById('input-fatty-trans').value =
            ingredient.fattyTrans;
        document.getElementById('input-fatty-saturated').value =
            ingredient.fattySaturated;
        document.getElementById('input-fatty-monounsaturated').value =
            ingredient.fattyMonounsaturated;
        document.getElementById('input-fatty-polyunsaturated').value =
            ingredient.fattyPolyunsaturated;
        document.getElementById('input-chloride').value = ingredient.chloride;

        // Lưu lại chỉ số của nguyên liệu đang chỉnh sửa
    }

    deleteIngredient(index) {
        // Xóa nguyên liệu ở vị trí chỉ mục index
        this.ingredients.splice(index, 1);

        // Cập nhật lại localStorage sau khi xóa
        save(this.ingredients);
        this.filterSortAndPaginate();
        // Hiển thị lại thông báo
        alert('Đã xóa nguyên liệu thành công!');
    }

    render(array) {
        collection.innerHTML = ``;
        array.forEach((temp, index) => {
            let cardFood = document.createElement('div');
            cardFood.className = 'card-food2';
            cardFood.addEventListener('click', () => {
                overlay2.style.display = 'flex';
                boxAddFood.style.display = 'none';
                this.Detail(temp.name);
            });

            cardFood.innerHTML = `
            <div class="card-food2-left">
                <div class="title-food2">${temp.name}</div>
                <div class="name-food2">${temp.source}</div>
            </div>
            <div class="card-food2-right">
                <ul>
                    <li>${temp.energy}</li>
                    <li>Energy</li>
                </ul>
                <ul>
                    <li>${temp.fat}</li>
                    <li>Fat</li>
                </ul>
                <ul>
                    <li>${temp.carbohydrate}</li>
                    <li>Carbohydrate</li>
                </ul>
                <ul>
                    <li>${temp.protein}</li>
                    <li>Protein</li>
                </ul>
            </div>
             `;

            collection.appendChild(cardFood);
        });
    }
    Detail(name) {
        let index = this.ingredients.findIndex(item=>item.name===name);
        let ingredient = this.ingredients[index];
        document.getElementById('output-name').innerText = ingredient.name;
        document.getElementById('output-source').innerText = ingredient.source;
        document.getElementById('output-category').innerText =
            ingredient.category;
        document.getElementById('output-quantity').innerText =
            ingredient.quantity;
        document.getElementById('output-energy').innerText = ingredient.energy;
        document.getElementById('output-fat').innerText = ingredient.fat;
        document.getElementById('output-carbohydrate').innerText =
            ingredient.carbohydrate;
        document.getElementById('output-protein').innerText =
            ingredient.protein;
        document.getElementById('output-cholesterol').innerText =
            ingredient.cholesterol;
        document.getElementById('output-fiber').innerText = ingredient.fiber;
        document.getElementById('output-sodium').innerText = ingredient.sodium;
        document.getElementById('output-water').innerText = ingredient.water;
        document.getElementById('output-vitamin-A').innerText =
            ingredient.vitaminA;
        document.getElementById('output-vitamin-B-6').innerText =
            ingredient.vitaminB6;
        document.getElementById('output-vitamin-B-12').innerText =
            ingredient.vitaminB12;
        document.getElementById('output-vitamin-C').innerText =
            ingredient.vitaminC;
        document.getElementById('output-vitamin-D').innerText =
            ingredient.vitaminD;
        document.getElementById('output-vitamin-E').innerText =
            ingredient.vitaminE;
        document.getElementById('output-vitamin-K').innerText =
            ingredient.vitaminK;
        document.getElementById('output-starch').innerText = ingredient.starch;
        document.getElementById('output-lactose').innerText =
            ingredient.lactose;
        document.getElementById('output-alcohol').innerText =
            ingredient.alcohol;
        document.getElementById('output-caffeine').innerText =
            ingredient.caffeine;
        document.getElementById('output-sugars').innerText = ingredient.sugars;
        document.getElementById('output-calcium').innerText =
            ingredient.calcium;
        document.getElementById('output-iron').innerText = ingredient.iron;
        document.getElementById('output-magnesium').innerText =
            ingredient.magnesium;
        document.getElementById('output-phosphorus').innerText =
            ingredient.phosphorus;
        document.getElementById('output-potassium').innerText =
            ingredient.potassium;
        document.getElementById('output-zinc').innerText = ingredient.zinc;
        document.getElementById('output-copper').innerText = ingredient.copper;
        document.getElementById('output-Fluoride').innerText =
            ingredient.fluoride;
        document.getElementById('output-manganese').innerText =
            ingredient.manganese;
        document.getElementById('output-selenium').innerText =
            ingredient.selenium;
        document.getElementById('output-thiamin').innerText =
            ingredient.thiamin;
        document.getElementById('output-riboflavin').innerText =
            ingredient.riboflavin;
        document.getElementById('output-niacin').innerText = ingredient.niacin;
        document.getElementById('output-pantothenic').innerText =
            ingredient.pantothenic;
        document.getElementById('output-folate').innerText = ingredient.folate;
        document.getElementById('output-folic').innerText = ingredient.folic;
        document.getElementById('output-fatty-trans').innerText =
            ingredient.fattyTrans;
        document.getElementById('output-fatty-saturated').innerText =
            ingredient.fattySaturated;
        document.getElementById('output-fatty-monounsaturated').innerText =
            ingredient.fattyMonounsaturated;
        document.getElementById('output-fatty-polyunsaturated').innerText =
            ingredient.fattyPolyunsaturated;
        document.getElementById('output-chloride').innerText =
            ingredient.chloride;

        editBtn.replaceWith(editBtn.cloneNode(true));
        deleteBtn.replaceWith(deleteBtn.cloneNode(true));

        editBtn = document.getElementById('edit');
        deleteBtn = document.getElementById('delete');

        editBtn.addEventListener('click', () => {
            this.editingIndex = index;
            this.editIngredient(index);
            document.getElementById('save-and-close').innerText = 'Update';
        });

        deleteBtn.addEventListener('click', () => {
            if (
                window.confirm(
                    'Bạn chắc chắn muốn xóa nguyên liệu này ? Dữ liệu sẽ mất vĩnh viễn !'
                )
            ) {
                this.deleteIngredient(index);
                this.render(this.ingredients);
                overlay2.style.display = 'none';
                boxAddFood.style.display = 'flex';
            }
        });
    }
}
 temp=new ManagerIngredient();
