// Storage Controller

// Item Controller

const ItemCtrl = (function(){ // function which is automatically invoked

  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [
      // {id: 0, name: "Pizza", calories: 1200},
      // {id: 1, name: "Chocolate", calories: 390}
    ], 
    currentItem: null,
    totalCalories: 0
  };

  //that is public
  return {
    getItems: function() {
      return data.items;
    },
    getItemById: function(id){
      let found = null;
      data.items.forEach(function(item) {
        if(item.id === id){
          found = item;
        };
      });
      return found;
    }, 
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    logData: function() {
      return data;
    }, 
    addItem: function(name, calories){
      let newId = 0;
      if(data.items.length > 0) {
        newId = data.items[data.items.length-1].id + 1; // a king of autoincrement
      } 
      intCalories = parseInt(calories);
      newItem = new Item(newId, name, intCalories);
      data.items.push(newItem);
      return newItem;
    },
    getTotalCalories: function(){
      let cal = 0;
      data.items.forEach(function(item){
        cal +=item.calories;
      })
      data.totalCalories = cal;
      return data.totalCalories;
    }

  }
})();


// UI Controller

const UICtrl = (function(){ // function which is automatically invoked
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCaloriesCounter: '.total-calories'
  };
  
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item){
        html += `
        <li id="item-${item.id}" class="collection-item"><strong>${item.name}: </strong> <em>${item.calories}</em><a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });
      const itemList = document.querySelector(UISelectors.itemList);
      itemList.innerHTML = html;
    }, 
    getSelectors : function() {
      return UISelectors;
    },
    getCurrentItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item){
      // show item list

      document.querySelector(UISelectors.itemList).style.display = 'block';
      // create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      // add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
      <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i></a>`;
      // ad element to item-list
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    }, 
    clearFields: function(){
      document.querySelector(UISelectors.itemNameInput).value ='';
      document.querySelector(UISelectors.itemCaloriesInput).value='';
    },
    hideItemList: function(){
      document.querySelector(UISelectors.itemList).style.display='none';
    }, 
    showTotalCalories: function(calories){
      document.querySelector(UISelectors.totalCaloriesCounter).textContent = ItemCtrl.getTotalCalories();
    }, 
    clearEditState: function(){
      this.clearFields();
      document.querySelector(UISelectors.updateBtn).style.display='none';
      document.querySelector(UISelectors.deleteBtn).style.display='none';
      document.querySelector(UISelectors.backBtn).style.display='none';
      document.querySelector(UISelectors.addBtn).style.display='inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display='inline';
      document.querySelector(UISelectors.deleteBtn).style.display='inline';
      document.querySelector(UISelectors.backBtn).style.display='inline';
      document.querySelector(UISelectors.addBtn).style.display='none';
    },
    addItemToForm: function(){
      const itemNameInput = document.querySelector(UISelectors.itemNameInput);
      const itemCaloriesInput = document.querySelector(UISelectors.itemCaloriesInput);
      itemNameInput.value = ItemCtrl.getCurrentItem().name;
      itemCaloriesInput.value = ItemCtrl.getCurrentItem().calories;
    }
  }

})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
  // load event listeners
  const loadEventListeners = function() {
    
    // add item event  
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', addItemSubmit);

    // edit item event
    document.querySelector(UISelectors.itemList).addEventListener('click', updateItemSubmit);
  }

  const addItemSubmit = function(e){
    console.log("Add");
    const currentItem = UICtrl.getCurrentItemInput();
    const name = currentItem.name;
    const calories = currentItem.calories;
    if (name != '' && calories != '' ) {
      console.log('not null');
      const newItem = ItemCtrl.addItem(name, calories);
      UICtrl.addListItem(newItem);

      // add and show total calories
      getAndShowCalories();

      UICtrl.clearFields();
    }
    e.preventDefault();
  }

  const updateItemSubmit = function(e) {
    if(e.target.classList.contains('edit-item')){
      // get list item id
      const itemId = e.target.parentNode.parentNode.id;
      // get real item id
      const listIdArr = itemId.split("-");
      const realId = parseInt(listIdArr[1]);
      const item = ItemCtrl.getItemById(realId);
      ItemCtrl.setCurrentItem(item);
      UICtrl.addItemToForm();
      UICtrl.showEditState();
    }
    
    
    e.preventDefault();
  }

  const getAndShowCalories = function() {
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
  }

  return {  
    init: function(){
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems();

      // if no items hide the list
      if(items.length < 1) {
        UICtrl.hideItemList();
      } else {
        UICtrl.populateItemList(items);
      }
      getAndShowCalories();
      loadEventListeners();
    }
  }
})(ItemCtrl,UICtrl);



App.init()