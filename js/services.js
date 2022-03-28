/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

  /////////////////
  // Task Service //
  /////////////////
  tasks: {

    // Creates a new task and attaches it to the pending task list.
    create: function (data) {
      // Task item template.
      let titre  = data.title.replace(" ","-");
      //'<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
      let taskItem = ons.createElement(`
        <ons-list-item tappable category="' + data.category + '">
            <label class="left">
                <ons-checkbox></ons-checkbox> 
            </label>
                <div class = "center" style="width: 150px">
                    ${data.title} | Expire le : ${data.date}
                </div>
            <div class="right">
                <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" "> </ons-icon>
            </div>
        </ons-list-item>
      `
      );

      // Store data within the element.
      taskItem.data = data;

      let pendingList = document.querySelector('#pending-list');
      pendingList.append(taskItem);


      /** Suppression */
      taskItem.querySelector('ons-icon').addEventListener('click', (e) => {
        myApp.controllers.suppression(e);
      });

      /** Done */
      taskItem.querySelector('ons-checkbox').addEventListener('click', (e) => {
        myApp.controllers.doneIt(e);
      })

      /** Show */
      taskItem.addEventListener('click', (e) => {
        myApp.services.tasks.displayTask(data);
      })
    },

    createImportante: function (data) {
      let titre  = data.title.replace(" ","-");
      let task = ons.createElement(`
          <ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox id="endTask_${titre}"></ons-checkbox>
                    </label>
                    <div class = "center" style="width: 150px">
                        ${data.title} | Expire le : ${data.date}
                    </div>
                    <div class = "right" style="display: block">
                        <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" > </ons-icon>
                    </div>
          </ons-list-item> `
      )
      task.data = data;
      document.querySelector('#important-list').appendChild(task);


      /** Suppression */
      task.querySelector('ons-icon').addEventListener('click', (e) => {
        myApp.controllers.suppression(e.target.parentNode.parentNode.data);
      });

      /** Done */
      task.querySelector('ons-checkbox').addEventListener('click', (e) => {
        myApp.controllers.doneIt(e);
      })

      /** Show */
      task.addEventListener('click', (e) => {
        myApp.services.tasks.displayTask(data);
      })

    },

    createDone: function (data) {
      let task = ons.createElement(`
          <ons-list-item tappable  category = ${data.cat}>
                    <div class = "center" style="width: 150px">
                        ${data.title}
                    </div>
          </ons-list-item> `
      )
      task.data = data;

      document.querySelector('#completed-list').appendChild(task);

    },

    displayTask: function (data) {
      document.querySelector('#myNavigator').pushPage('html/details_task.html').then(() =>{
        let task = ons.createElement(`
          <div>
          

              <ons-toolbar>
                  <div class="left"><ons-back-button>Back</ons-back-button></div>
                  <div class="center">Details</div>
                  <div class="right">
                      <ons-toolbar-button component="button/save-task">
                          <ons-if platform="android">
                              <ons-icon icon="md-save"></ons-icon>
                          </ons-if>
                          <ons-if platform="ios other">
                              Save
                          </ons-if>
                      </ons-toolbar-button>
                  </div>
              </ons-toolbar>
    
            <ons-list-title>Modifier votre tache</ons-list-title>
              <ons-list>
                  <ons-list-item modifier="nodivider">
                      <ons-if platform="ios other" class="left left-label">
                          ${data.title}
                      </ons-if>
                      <div class="center">
                          <ons-input id="title" type="text" placeholder="${data.title}" float></ons-input>
                      </div>
                  </ons-list-item>
                  <ons-list-item modifier="nodivider">
                      <ons-if platform="ios other" class="left left-label">
                          ${data.cat}
                      </ons-if>
                      <div class="center">
                          <ons-input id="category" type="text" placeholder="${data.cat}" float></ons-input>
                      </div>
                  </ons-list-item>
                  <ons-list-item modifier="nodivider">
                      <ons-if platform="ios other" class="left left-label">
                          ${data.desc}
                      </ons-if>
                      <div class="center">
                          <ons-input id="description" type="text" placeholder="${data.desc}" float></ons-input>
                      </div>
                  </ons-list-item>
                  <ons-list-item modifier="nodivider">
                    <div class="center">
                      <ons-input id="date" type="date" placeholder="" float></ons-input>
                    </div>
                  </ons-list-item>
                  <ons-list-item modifier="nodivider">
                      <div className = "left">
                        <ons-switch id = "importante" ${data.importante ? 'checked' : ''}> </ons-switch>
                       </div>

                      <label className="center" htmlFor="importante">Important</label>
                  </ons-list-item>
              </ons-list>
          </div>  `

        )

        task.data = data;
        
        document.querySelector('#detailsTaskPage').appendChild(task);
        console.log(document.querySelector('ons-toolbar-button[component="button/save-task"]'))
        
        /** Changement */
        document.querySelector('ons-toolbar-button[component="button/save-task"]').addEventListener('click', () => {

          let newData = {
            title: document.querySelector("#title").value,
            desc: document.querySelector('#description').value,
            cat: document.querySelector('#category').value.replace(" ", "_"),
            importante: document.querySelector('#importante').checked,
            date: document.querySelector('#date').value
          }

          if (data.importante) {
            console.log(data);
            myApp.services.important.find((elem) => JSON.stringify(elem) === JSON.stringify(data)).title = newData.title;
            console.log(myApp.services.important.find((elem) => JSON.stringify(elem)).title);
            console.log(myApp.services.important)
          }

          if (!data.importante) {
            myApp.services.fixtures.find((elem) => JSON.stringify(elem) === JSON.stringify(data)).title = newData.title;
          }
          myApp.services.tasks.lStorage.save();
          document.querySelector('#important-list').innerHTML = '';
          myApp.services.important.forEach(function (data) {
            myApp.services.tasks.createImportante(data);
          });

          document.querySelector('#pending-list').innerHTML = '';
          myApp.services.fixtures.forEach(function (data) {
            myApp.services.tasks.create(data);
          });
          document.querySelector('ons-navigator').popPage();
        })

      })

    },

    newCateg: function () {
      document.querySelector('#myNavigator').pushPage('html/new_categorie.html').then(() =>{
        let task = ons.createElement(`
          <div>
              <ons-toolbar>
                  <div class="left"><ons-back-button>Back</ons-back-button></div>
                  <div class="center">Création catégorie</div>
                  <div class="right">
                      <ons-toolbar-button component="button/save-categ">
                          <ons-if platform="android">
                              <ons-icon icon="md-save"></ons-icon>
                          </ons-if>
                          <ons-if platform="ios other">
                              Save
                          </ons-if>
                      </ons-toolbar-button>
                  </div>
              </ons-toolbar>
    
              
              <ons-list>
              <ons-list-item style="margin-top: 100px;">
              <h4>Créer votre catégorie</h4>
              </ons-list-item>
              <ons-list-item style="margin-top: 100px;">
                <p>Nom de la catégorie</p>
              </ons-list-item>
                  <ons-list-item modifier="nodivider">
                      <div class="center">
                          <ons-input id="category" type="text" placeholder="salut" float></ons-input>
                      </div>
                  </ons-list-item>
              </ons-list>
          </div>  `

        )


        document.querySelector('#newCategPage').appendChild(task);
        document.querySelector('ons-toolbar-button[component="button/save-categ"]').addEventListener('click', () => {
          if (!myApp.services.categories.includes(document.querySelector('#category').value.replace(" ", "_"))){
            myApp.services.categories.push(document.querySelector('#category').value.replace(" ", "_"));
            myApp.services.tasks.lStorage.save();
          } else {
            window.alert("La catégorie existe déjà !")
          }

          document.querySelector('#custom-category-list').innerHTML = '';
          myApp.services.categories.forEach( categ => {
            let html = ons.createElement(`
            <ons-list-item tappable>
              <div class="left">
                <ons-radio name="categoryGroup" input-id="r-all" checked></ons-radio>
              </div>
              <label class="center" for="r-all">${categ}</label>
            </ons-list-item>
            `);

            html.querySelector('ons-radio').addEventListener('change', (e) => {
              console.log(e.target.parentNode.parentNode.parentNode.querySelector('label').innerHTML);

              document.querySelector('#important-list').innerHTML = '';
              myApp.services.important.forEach(function (data) {
                myApp.services.tasks.createImportante(data);
              });

              document.querySelector('#pending-list').innerHTML = '';
              myApp.services.fixtures.forEach(function (data) {
                myApp.services.tasks.create(data);
              });

            });

            document.querySelector('#custom-category-list').appendChild(html);



          });

          document.querySelector('ons-navigator').popPage();

        })




      })

    },

  lStorage: {
    save: function () {
      let jsonString = JSON.stringify(myApp.services.fixtures);
      localStorage.setItem("tabTache", jsonString);

      let jsonString2 = JSON.stringify(myApp.services.done);
      localStorage.setItem("tabFini", jsonString2);

      let jsonString3 = JSON.stringify(myApp.services.important);
      localStorage.setItem("tabImportant", jsonString3);

      let jsonString4 = JSON.stringify(myApp.services.categories);
      localStorage.setItem("tabCateg", jsonString4);
    },

    load: function () {
      let tmp = localStorage.getItem("tabTache");
      if (JSON.parse(tmp) != null) {
        myApp.services.fixtures = JSON.parse(tmp);
      }

      let tmp2 = localStorage.getItem("tabFini");
      if (JSON.parse(tmp2) != null) {
        myApp.services.done = JSON.parse(tmp2);
      }

      let tmp3 = localStorage.getItem("tabImportant");
      if (JSON.parse(tmp3) != null) {
        myApp.services.important = JSON.parse(tmp3);
      }

      let tmp4 = localStorage.getItem("tabCateg");
      if (JSON.parse(tmp4) != null) {
        myApp.services.categories = JSON.parse(tmp4);
      }

      }

    },

  },





  ////////////////////////
  // Initial Data Service //
  ////////////////////////
  fixtures: [],
  important: [],
  done: [],
  categories: []
};

myApp.services.tasks.lStorage.load();
