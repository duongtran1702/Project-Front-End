let collection = document.getElementById('collection');

function saveCollection(array) {
    localStorage.setItem('collection', JSON.stringify(array));
}

function loadCollection() {
    let collection = localStorage.getItem('collection');
    let parsedCollection = JSON.parse(collection) || [];

    // Tái tạo các đối tượng FoodCard từ dữ liệu JSON
    return parsedCollection.map(
        (item) =>
            new FoodCard(
                item.image,
                item.title,
                item.name,
                item.numLike,
                item.category,
                item.by,
                item.energy,
                item.fat,
                item.carbohydrate,
                item.protein
            )
    );
}

let searchFood = document.getElementById('search');
let selectCategory = document.getElementById('filter-category');
let arrowIcon = document.getElementsByClassName('fa-arrow-up-wide-short');
let sortIcon = arrowIcon[0];
let sortNutrient = document.getElementById('select-sort');

class FoodCard {
    constructor(
        image,
        title,
        name,
        numLike,
        category,
        by,
        energy,
        fat,
        carbohydrate,
        protein
    ) {
        this.image = image;
        this.title = title;
        this.name = name;
        this.numLike = numLike;
        this.category = category;
        this.by = by;
        this.energy = energy;
        this.fat = fat;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
    }
    overall() {
        return (
            ((this.carbohydrate + this.energy + this.fat + this.protein) /
                this.by) *
            100
        );
    }
}

class Gallery {
    constructor() {
        this.collections = loadCollection();

        this.render(this.collections);
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
        this.itemsPerPage = 6;
        this.currentPage = 1;
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
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.innerHTML = `<i class="fa-solid fa-forward next-btn"></i>`;

        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.filterSortAndPaginate();
            }
        });
        paginationDiv.appendChild(nextBtn);
    }

    filterSortAndPaginate() {
        let filteredArray = this.collections;

        // Bước 1: Lọc dữ liệu theo các điều kiện
        if (this.searchQuery && this.selectedCategory) {
            filteredArray = filteredArray.filter(
                (item) =>
                    item.category === this.selectedCategory &&
                    item.title.toLowerCase().includes(this.searchQuery)
            );
        } else if (this.selectedCategory) {
            filteredArray = filteredArray.filter(
                (item) => item.category === this.selectedCategory
            );
        } else if (this.searchQuery) {
            filteredArray = filteredArray.filter((item) =>
                item.title.toLowerCase().includes(this.searchQuery)
            );
        }

        // Bước 2: Sắp xếp dữ liệu
        this.sortByEachNutrient(filteredArray);

        // Bước 3: Phân trang
        let totalPages = Math.ceil(filteredArray.length / this.itemsPerPage)+96;
        let start = this.itemsPerPage * (this.currentPage - 1);
        let end = this.itemsPerPage * this.currentPage;
        let paginatedArray = filteredArray.slice(start, end);

        // Bước 4: Render lại dữ liệu
        this.render(paginatedArray);
        console.log(paginatedArray);

        this.renderPagination(totalPages);
    }

    sortByEachNutrient(array) {
        const direction = this.isAscending ? 1 : -1;

        const nutrientValues = {
            overall: (item) => item.overall(),
            fat: (item) => (item.fat / item.by) * 100,
            protein: (item) => (item.protein / item.by) * 100,
            carbohydrate: (item) => (item.carbohydrate / item.by) * 100,
            energy: (item) => (item.energy / item.by) * 100,
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

    filterCategory() {
        this.collections.forEach((item) => {
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

    render(array) {
        collection.innerHTML = '';
        array.forEach((card, index) => {
            let foodCard = document.createElement('div');
            foodCard.className = 'food-card';

            foodCard.innerHTML = `<div class="left-card">
                    <div class="image">
                    <img src="${card.image}" alt="" />
                    <div class="community-recipes">
                        <img
                            src="/my-photos/diversity_3.svg.png"
                            alt=""
                        />&nbsp;&nbsp;Community Recipe
                    </div>
                </div>
                </div>`;

            let rightCard = document.createElement('div');
            rightCard.className = 'right-card';

            rightCard.innerHTML = `<div class="title">
                        ${card.title}
                    </div>`;

            let recipeInfor = document.createElement('div');
            recipeInfor.className = 'recipe-infor';

            let name = document.createElement('div');
            name.className = 'name';
            name.innerText = card.name;

            let boxHeart = document.createElement('div');
            boxHeart.className = 'box-heart';

            let i = document.createElement('i');
            i.className = 'fa-solid fa-heart heart';

            let numLike = document.createElement('div');
            numLike.innerText = card.numLike;

            // sự kiện like
            i.addEventListener('click', (event) => {
                console.log(index);
                const updatedFood = this.collections.find(
                    (item) => item.title === card.title
                );
                if (updatedFood) {
                    updatedFood.numLike += 1; // Cập nhật lại số like
                    numLike.innerText = updatedFood.numLike; // Cập nhật lại hiển thị số like
                    saveCollection(this.collections); // Lưu lại mảng
                }
                event.stopPropagation();
            });

            boxHeart.appendChild(i);
            boxHeart.appendChild(numLike);

            recipeInfor.appendChild(name);
            recipeInfor.appendChild(boxHeart);

            let category = document.createElement('div');
            category.className = 'category';
            category.innerHTML = ` <img src="/my-photos/Icon-2.png" alt="" class="icon-2" />
                        <div class="name-category">
                            ${card.category}
                        </div>
                    `;

            let foodInfor = document.createElement('div');
            foodInfor.className = 'food-infor';
            foodInfor.innerHTML = `<ul>
                            <li>By</li>
                            <li>${card.by} g</li>
                        </ul>
                        <ul>
                            <li>Energy</li>
                            <li>${card.energy} kcal</li>
                        </ul>
                        <ul>
                            <li>Fat</li>
                            <li>${card.fat} g</li>
                        </ul>
                        <ul>
                            <li>Carbohydrate</li>
                            <li>${card.carbohydrate} g</li>
                        </ul>
                        <ul>
                            <li>Protein</li>
                            <li>${card.protein} g</li>
                        </ul>`;

            rightCard.appendChild(recipeInfor);
            rightCard.appendChild(category);
            rightCard.appendChild(foodInfor);

            foodCard.appendChild(rightCard);

            collection.appendChild(foodCard);
        });
    }
}
new Gallery();
