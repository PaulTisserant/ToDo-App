/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });
  },

  clickCreate : function() {
    let data = {
      title : document.querySelector("#title").value,
      desc: document.querySelector('#desc').value,
      cat : document.querySelector('.select').value,
      importante : document.querySelector('#importante').checked,
      date : document.querySelector('#date').value
    }
    if (data.date===""){ //pour mettre la date automatiquement si pas rempli
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      data.date = today;
    }

    if (data.cat === ""){
      data.cat = "Sans catégorie";
    }

    if (data.importante) {
      myApp.services.important.push(data);
      myApp.services.tasks.createImportante(data);
    } else {
      myApp.services.fixtures.push(data);
      myApp.services.tasks.create(data);
    }
    //document.location.reload()
    document.querySelector('ons-navigator').popPage();
  },
  
  suppression : function (data) {

      if (data.importante) {

        document.querySelector('#important-list').innerHTML = '';

        myApp.services.important.splice(myApp.services.important.indexOf(data), 1);

        myApp.services.important.forEach( elem => {
          myApp.services.tasks.createImportante(elem);
        });

      } else if (!data.importante){

        document.querySelector('#pending-list').innerHTML = '';

        myApp.services.fixtures.splice(myApp.services.fixtures.indexOf(data), 1);

        myApp.services.fixtures.forEach(elem => {
          myApp.services.tasks.create(elem);
          });

      }
    myApp.services.tasks.lStorage.save();
  },

  doneIt : function (event) {
    let data = event.target.parentNode.parentNode.parentNode.data;

    this.suppression(data);
    myApp.services.done.push(data);
    myApp.services.tasks.lStorage.save();
    myApp.services.tasks.createDone(data);
  },


  suppressionCateg : function (name) {
    myApp.services.categories.splice(myApp.services.categories.indexOf(name), 1);
    document.querySelector('#custom-category-list').innerHTML = "";
    myApp.services.categories.forEach(categorie => {
      myApp.services.tasks.showCateg(categorie);
    });
    myApp.services.fixtures.forEach(elem => {
      if (elem.cat === name) {
        this.suppression(elem);
      }
    });
    myApp.services.done.forEach(elem => {
      if (elem.cat === name) {
        this.suppression(elem);
      }
    });
    myApp.services.important.forEach(elem => {
      if (elem.cat === name) {
        this.suppression(elem);
      }
    });
    myApp.services.tasks.lStorage.save();
  },

  deleteAllTasks : function () {
    myApp.services.fixtures.forEach(elem => {
        this.suppression(elem);
    });
    myApp.services.done.forEach(elem => {
      myApp.services.done.splice(elem , 1);
    });
    myApp.services.important.forEach(elem => {
        this.suppression(elem);
    });
    myApp.services.tasks.lStorage.save();
  }
};
