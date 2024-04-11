Zabiada Arman, [4/11/2024 8:56 PM]
let list = [];


let listFromStorage = localStorage.getItem("list"); 
if (listFromStorage) {
    list = JSON.parse(listFromStorage);
    for (let i = 0;  i < list.length; i++) {
        let currentItem = list[i];

        let color = "";
        // Set the color depending on which category was chosen
        if( currentItem.category === 'fruit') {
            color = 'bg-orange-200';
        }
        else if(currentItem.category === 'dairy') {
            color = 'bg-orange-400'
        }
        else if(currentItem.category === 'grain') {
            color = 'bg-orange-600'
        }

        // Create html string template
        let htmlString = 
            <li class="border-b border-gray-400 border-solid py-2.5">
                <span>➡️</span>
                ${currentItem.name}
                <span class="text-black rounded ml-1 ${color}">${currentItem.category}</span>
            </li>
        ;

        // Add the html string into the parent
        document.querySelector("#list-items").innerHTML += htmlString;

    }
}


// Initial
document.querySelector("#list-form").addEventListener("click", function(e) {
    e.preventDefault();
    add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        console.log("clicked on emoji");
        let listItem = e.target.parentNode;

        // removing the element from the list
        console.log(listItem);
        console.log(listItem.parentNode);
        let children = listItem.parentNode.children;
        console.log(children);
        let childrenArray = Array.from(children);
        let index = childrenArray.indexOf(listItem);
        list.splice(index, 1);
        console.log(list);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

        // removing the element from the HTML
        listItem.remove();
    
    }
});

function isValidated() {
    console.log("Running isValidated function!");

    let isValid = false;
    let item = document.querySelector("#item-input").value.trim();
    let category = document.querySelector("#listContainer").value.trim();

    if( item.length <= 0 && category.length <= 0 ) {
        document.querySelector("#item-input").classList.add("border-red-500");
        document.querySelector("#listContainer").classList.add("border-red-500");
    } 
    else if( item.length <= 0) {
        document.querySelector("#item-input").classList.add("border-red-500");
        document.querySelector("#listContainer").classList.remove("border-red-500");
    }
    else if( category.length <= 0) {
        document.querySelector("#listContainer").classList.add("border-red-500");
        document.querySelector("#item-input").classList.remove("border-red-500");
    }
    else {
        document.querySelector("#item-input").classList.remove("border-red-500");
        document.querySelector("#listContainer").classList.remove("border-red-500");
        isValid = true;
    }
    return isValid;
}

function add() {
    console.log("Running add function!");

    if (isValidated()) {
        // Get the user input
        let item = document.querySelector("#item-input").value.trim();
        let category = document.querySelector("#listContainer").value.trim();
        let color = "";

        // Set the color depending on which category was chosen
        if( category === 'fruit') {
            color = 'bg-orange-200';
        }
        else if(category === 'dairy') {
            color = 'bg-orange-400'
        }
        else if(category === 'grain') {
            color = 'bg-orange-600'
        }

        let newItem = {
            name: item,
            category: category,
        };

        list.push(newItem);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

Zabiada Arman, [4/11/2024 8:56 PM]
// Create html string template
        let htmlString = 
            <li class="border-b border-gray-400 border-solid py-2.5">
                <span>➡️</span>
                ${item}
                <span class="text-black rounded ml-1 ${color}">${category}</span>
            </li>
        ;

        // Add the html string into the parent
        document.querySelector("#list-items").innerHTML += htmlString;

        // Clear the inputs
        document.querySelector("#item-input").value = "";
        document.querySelector("#listContainer").value = "";

    }
    else {
        console.log("Invalid inputs");
    }
}
document.addEventListener(add, function () {
  const addButton = document.querySelector('submit');
  addButton.addEventListener("click", add);
});