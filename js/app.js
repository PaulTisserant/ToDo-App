// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  const page = event.target;



  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
      && document.querySelector('#pendingTasksPage')
      && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      myApp.services.fixtures.forEach(function (data) {
        myApp.services.tasks.create(data);
      });
      document.getElementById('newCateg').addEventListener('click', () => {
        myApp.services.tasks.newCateg();
      });
    }
  }

  if (page.id === 'importantTasksPage') {
      myApp.services.important.forEach(function (data) {
        myApp.services.tasks.createImportante(data);
      });
  }

  if (page.id === 'completedTasksPage') {
    myApp.services.done.forEach(function (data) {
      myApp.services.tasks.createDone(data);
    });
  }

  if(page.id === 'newTaskPage'){
    page.getElementsByTagName('ons-icon')[0].addEventListener('click', () => {
      myApp.controllers.clickCreate();
      myApp.services.tasks.lStorage.save();
    })
  }


});
