// Storage Controller
const StorageCtrl = (function(){
  
  const Keys = {
    items: 'items'
  };

  
  return{
      storeItem: function(newItem) {
        let items = localStorage.getItem(Keys.items); // this is the key under wchich we keep our item list
        if ( items === null ){
          items = [];
          items.push(newItem);
          localStorage.setItem(Keys.items, JSON.stringify(items));
        } else {
          items = JSON.parse(items);
          items.push(newItem);
          localStorage.setItem(Keys.items, JSON.stringify(items));
        }
      },
      updateItem: function(updatedItem) {
        let items = JSON.parse(localStorage.getItem(Keys.items));
        items.forEach(function(item, index){
          
          if(item.id == updatedItem.id) {
            items.splice(index, 1, updatedItem);
          }
        });
        localStorage.setItem(Keys.items, JSON.stringify(items));
      },
      deleteItem: function(id) {
        let items = JSON.parse(localStorage.getItem(Keys.items));
        items.forEach(function(item, index){
          
          if(item.id == id) {
            items.splice(index, 1);
          }
        });
        localStorage.setItem(Keys.items, JSON.stringify(items));
      },
      getItems: function() {
        let items;
        if( localStorage.getItem(Keys.items) === null ){
          items = [];
        } else {
          items = JSON.parse(localStorage.getItem(Keys.items));
        }
        return items;
      },
      deleteAllItems: function() {
        localStorage.removeItem(Keys.items);
      }
  }
})();

// Item Controller

const ItemCtrl = (function(){ // function which is automatically invoked

  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    // items: [
    //   // {id: 0, name: "Pizza", calories: 1200},
    //   // {id: 1, name: "Chocolate", calories: 390}
    // ], 
    items: StorageCtrl.getItems(),
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
    updateCurrentItem: function(name, calories){
      // Calories to number
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
          // return found;   <-- it wouldn't work
       };
      });
      return found;
    },
    deleteCurrentItem: function(id){ 
      const ids = data.items.map(function(item){
        return item.id;
      });
      // get index of item to delete
      const index = ids.indexOf(id);

      // remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function(){
      data.items = [];
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
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
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
      UICtrl.clearFields();
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
    }, 
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // convert node list into array
      listItems = Array.from(listItems);
      
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      let item = document.querySelector(itemID);
      item.remove();
      
    },
    removeAllListItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    }
  }

})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // load event listeners
  const loadEventListeners = function() {
    
    // add item event  
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', addItemSubmit);

    // disable submit new item on enter (by default it works)
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    // click edit item event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItemSubmit);

    // delete button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItemSubmit);

    // back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // clear button event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

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
      
      // add item to local storag
      StorageCtrl.storeItem(newItem);

      UICtrl.clearFields();
    }
    e.preventDefault();
  }

  const itemEditClick = function(e) {
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

  const updateItemSubmit = function(e) {

    const itemInput = UICtrl.getCurrentItemInput();
    const updatedItem = ItemCtrl.updateCurrentItem(itemInput.name, itemInput.calories);
    
    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Update calories on UI

    getAndShowCalories();

    // Update item in storage ctrl
    StorageCtrl.updateItem(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  const deleteItemSubmit = function(e) {
    const itemToDelete = ItemCtrl.getCurrentItem();
    console.log(itemToDelete);
    ItemCtrl.deleteCurrentItem(itemToDelete.id);
    UICtrl.deleteListItem(itemToDelete.id);

    // Update calories on UI

    getAndShowCalories();

    // Delete from local storage
    StorageCtrl.deleteItem(itemToDelete.id);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  const clearAllItemsClick = function(e) {
    // delete all items from data structure
    ItemCtrl.clearAllItems();

    // remove calories
    getAndShowCalories();

    // remove from UI
    UICtrl.removeAllListItems();

   // Delete all items from local storage
    StorageCtrl.deleteAllItems();

    UICtrl.clearEditState();

    // hide UL
    UICtrl.hideItemList();


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
})(ItemCtrl, StorageCtrl, UICtrl);



App.init()