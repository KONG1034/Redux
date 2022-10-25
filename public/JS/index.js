let store = Redux.createStore(reducer);

/* HTML */
function subject() {
    document.querySelector('#subject').innerHTML = `
        <header>
            <h1>WEB</h1>
            Hello, WEB
        </header>
    `
}
function menu() {
    let state = store.getState();
    let liTags = '';
    let i = 0;
    while(i<state.contents.length) {
        liTags += `
            <li>
                <a onclick="
                    event.preventDefault();
                    let action = {type:'SELECT', id:${state.contents[i].id}}
                    store.dispatch(action);
                "
                href="${state.contents[i].id}">
                    ${state.contents[i].title}
                </a>
            </li>
        `
        i = i+1;
    }

    document.querySelector('#menu').innerHTML = `
    <nav>
        <ol>
            ${liTags}
        </ol>
    </nav>
    `
}
function control() {
    document.querySelector('#control').innerHTML = `
        <ul>
            <li><button>create</button></li>
            <li><button>delete</button></li>
        </ul>
    `
}
function article() {
    let state = store.getState();
    let i = 0;
    let atitle, adesc = null;
    while(i < state.contents.length) {
        if(state.contents[i].id === state.selected_id) {
            atitle = state.contents[i].title;
            adesc = state.contents[i].desc;

            break;
        }
        i = i+1;
    }
    document.querySelector('#article').innerHTML = `
        <article>
            <h2>${atitle}</h2>
            ${adesc}
        </article>
    `
}

subject();
menu();
control();
article();

/* 리덕스 */

function reducer(state, action) {
    //초기값 설정
    if(state === undefined) {
        return {
            selected_id:1,
            contents: [
                {
                    id:1,
                    title:'HTML',
                    desc:'HTML is ...'
                },
                {
                    id:2,
                    title:'CSS',
                    desc:'CSS is ...'
                }
            ]
        }
    }
    let newState = {};
    if(action.type === 'SELECT') {
        newState = Object.assign({}, state, {selected_id:action.id});
        return newState;
    }
}
store.subscribe(article);
