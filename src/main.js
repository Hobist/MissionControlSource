import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'

import Dashboard from './views/Dashboard.vue'
import Project from './views/Project.vue'
import Activity from './views/Activity.vue'

const router = createRouter({
    history: createWebHistory(),
    strict: true, // Enforces trailing slashes
    routes: [
        {path: '/', name: "Home", component: Dashboard},
        {path: '/project/:id', name: "Project", component: Project, props: true},
        {path: '/activity', name: 'Activity', component: Activity}
    ]
})

const store = createStore({
  state () {
    return {
        open: null,
        db: null,
        projects: [],
        tasks: [],
    }
  },
  mutations: {
    connect (state) {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
                
        state.open = indexedDB.open("MissionControl", 1);

        state.open.onupgradeneeded = () => {
            var db = state.open.result;
            db.createObjectStore("Tasks", {keyPath: 'id', autoIncrement: true});
            db.createObjectStore("Projects", {keyPath: 'id', autoIncrement: true});
            db.createObjectStore("Notes", {keyPath: 'projectID'})
        }

        state.open.onsuccess = () => {
            state.db = state.open.result;
            
            var tx;
            var store;
            var req;

            // fetch all projects
            tx = state.db.transaction("Projects", "readwrite");
            store = tx.objectStore("Projects");
            req = store.getAll();
            req.onsuccess = (evt) => {
                
                state.projects = evt.target.result
            }
            req.onerror = (evt) => {
                console.log("Error fetching data", evt)
            }

            // fetch all tasks
            tx = state.db.transaction("Tasks", "readwrite");
            store = tx.objectStore("Tasks");
            req = store.getAll();
            req.onsuccess = (evt) => {
                state.tasks = evt.target.result
            }
            req.onerror = (evt) => {
                console.log("Error fetching data", evt)
            }
        }

        state.open.onerror = (e) => {
            console.log("connection error", e.target.error.message)
        }
    },

    disconnect (state) {
        state.db.close()
    },

    createProject (state, info) {
        var tx = state.db.transaction("Projects", "readwrite");
        var store = tx.objectStore("Projects");

        var req = store.add(info)
        req.onsuccess = (evt) => {

            info["id"] = evt.target.result

            state.projects.push(info)

            var tx = state.db.transaction("Notes", "readwrite");
            var store = tx.objectStore("Notes");
            var req = store.add({
                "projectID": evt.target.result,
                "notes": ""
            })
            req.onerror = (evt) => {console.log("Error creating notes instance")}
        }
        req.onerror = (evt) => {
            console.log("Error creating project")
        }
    },
    createTask (state, info) {
        var tx = state.db.transaction("Tasks", "readwrite");
        var store = tx.objectStore("Tasks");

        var req = store.add(info)
        req.onsuccess = (evt) => {
            info["id"] = evt.target.result

            state.tasks.push(info)
        }
        req.onerror = (evt) => {
            console.log("Error creating task")
        }
    },

    updateTaskStatus (state, info) {
        var tx = state.db.transaction("Tasks", "readwrite");
        var store = tx.objectStore("Tasks");

        var req = store.put(info)
        // req.onsuccess = (evt) => {
        //     // state.tasks.push(info)
        // }
        req.onerror = (evt) => {
            console.log("Error creating task")
        }   
    },

    saveNotes (state, info) {
        var tx = state.db.transaction("Notes", "readwrite");
        var store = tx.objectStore("Notes");

        var req = store.put(info)
        req.onsuccess = (evt) => { console.log("Notes saved", evt); }
        req.onerror = (evt) => {
            console.log("Error creating task")
        }   
    }
  },

  actions: {
    getProject (str, id) {
        return str.state.projects.filter((project) => project.id == id)
    },
    getNotes (str, id) {
        var tx = str.state.db.transaction("Notes", "readwrite");
        var store = tx.objectStore("Notes");

        let req = store.get(Number(id));
        
        return new Promise((resolve, reject) => {
            req.onsuccess = (evt) => resolve(evt.target.result);
            req.onerror = (evt) => reject(evt.target.error);
        })
    }
  }
})

createApp(App).use(router).use(store).mount('#app')
