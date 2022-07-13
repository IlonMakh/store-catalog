import './filter.css';

export class Filter {
    draw() {
        const htmlSorting = `
            <div class="filter">
                <div class="filter_collection">
                    <h6>Collection</h6>
                    <select class="collection_select" name="collection[]">
                        <option selected>No collection</option>
                        <option value="Superhero workdays">Superhero workdays</option>
                        <option value="Disney princess dream">Disney princess dream</option>
                        <option value="Warm and cozy">Warm and cozy</option>
                        <option value="Hogwarts school">Hogwarts school</option>
                        <option value="Christmas morning">Christmas morning</option>
                        <option value="Colorful mood">Colorful mood</option>
                        <option value="Summer vibes">Summer vibes</option>
                    </select>
                </div>
                <div class="filter_size">
                    <h6>Size</h6>
                    <div class="sizes">
                        <button class="size-btn">35</button>
                        <button class="size-btn">36</button>
                        <button class="size-btn">37</button>
                        <button class="size-btn">38</button>
                        <button class="size-btn">39</button>
                        <button class="size-btn">40</button>
                        <button class="size-btn">41</button>
                        <button class="size-btn">42</button>
                        <button class="size-btn">43</button>
                    </div>
                </div>
                <div class="filter_color">
                    <h6>Color</h6>
                    <div class = 'colors'>
                        <div class="white">
                            <input type="checkbox" id="white">
                            <label for="white">white</label>
                        </div>
                        <div class="black">
                            <input type="checkbox" id="black">
                            <label for="black">black</label>
                        </div>
                        <div class="red">
                            <input type="checkbox" id="red">
                            <label for="red">red</label>
                        </div>
                        <div class="grey">
                            <input type="checkbox" id="grey">
                            <label for="grey">grey</label>
                        </div>
                        <div class="blue">
                            <input type="checkbox" id="blue">
                            <label for="blue">blue</label>
                        </div>
                        <div class="pink">
                            <input type="checkbox" id="pink">
                            <label for="pink">pink</label>
                        </div>
                        <div class="purple">
                            <input type="checkbox" id="purple">
                            <label for="purple">purple</label>
                        </div>
                        <div class="yellow">
                            <input type="checkbox" id="yellow">
                            <label for="yellow">yellow</label>
                        </div>
                        <div class="green">
                            <input type="checkbox" id="green">
                            <label for="green">green</label>
                        </div>
                    </div>
                </div>
                <div class="filter_new">
                    <label for="new">Show only new</label>
                    <input type="checkbox" id="new">
                </div>
                <div class = "filter_price">
                    <h6>Price ($)</h6>
                    <div class = "price_range">
                        <input readonly  type = "number" min = "1" max = "10" value = "1" class = "price_input-min">
                        <div class = "price_slider"></div>
                        <input readonly  type = "number" min = "1" max = "10" value = "10" class = "price_input-max">
                    </div>
                </div>
                <div class = "filter_amount">
                    <h6>Amount (pairs left)</h6>
                    <div class = "amount_range">
                        <input readonly type = "number" min = "1" max = "100" value = "1" class = "amount_input-min">
                        <div class = "amount_slider"></div>
                        <input readonly type = "number" min = "1" max = "100" value = "100" class = "amount_input-max">
                    </div>
                </div>
            </div>
        `;
        (<HTMLElement>document.querySelector('.sorting')).innerHTML = htmlSorting;
    }

    collectionFilter() {
        const selector: HTMLSelectElement = document.querySelector('.collection_select') as HTMLSelectElement;
        const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.catalog_item');
        selector.addEventListener('change', function () {
            cards.forEach(function (elem) {
                const name: HTMLElement = elem.querySelector('.item_name') as HTMLElement;
                const cardInfo: string = name.getAttribute('data-tooltip') as string;
                if (selector.value === 'No collection') {
                    elem.classList.remove('hide');
                } else if ((<string>cardInfo).indexOf(selector.value) == -1) {
                    elem.classList.add('hide');
                } else {
                    elem.classList.remove('hide');
                }
            });
        });
    }
    /*
    sizeFilter() {
        const sizeButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.size-btn');
        const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.catalog_item');
        sizeButtons.forEach(function (elem) {
            elem.addEventListener('click', function () {
                const sizeArray: number[] = [];
                elem.classList.toggle('active');
                sizeArray.push(+(elem.innerText));
                cards.forEach(function(card) {
                    const name: HTMLElement = elem.querySelector('.item_name') as HTMLElement;
                    const cardInfo: string = name.getAttribute('data-tooltip') as string;
                    if(!sizeArray.length) {
                        card.classList.remove
                    }
                })
            });
        });
    }*/
}

//Делать проверку на то, есть ли класс хайд у элемента и если нет, то фильтровать
