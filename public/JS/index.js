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
            <li><button onclick="
                store.dispatch({
                    type:'CHANGE_MODE',
                    mode:'create'
                })
            ">
                create
            </button></li>
            <li><button onclick="
                store.dispatch({
                    type: 'DELETE'
                })
            ">
                delete
            </button></li>
        </ul>
    `
}
function article() {
    var state = store.getState();
    console.log(state)
    if(state.mode === 'CREATE') {
        document.querySelector('#article').innerHTML = `
            <article>
                <form onsubmit="
                    event.preventDefault();
                    let _title = this.title.value;
                    let _desc = this.desc.value;
                    store.dispatch({
                        type:'CREATE',
                        title: _title,
                        desc: _desc
                    })
                ">
                    <p>
                        <input type="text" name="title" placeholder="title"/>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="desc"></textarea>
                    </p>
                    <p>
                        <input type="submit"/>
                    </p>
                </form>
            </article>
        `
    } else if(state.mode === 'read') {
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
    } else if(state.mode === 'welcome') {
        document.querySelector('#article').innerHTML = `
            <h2>Welcome</h2>
            Hello, Redux!!
        `
    }
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
            max_id:2,
            mode:'CREATE',
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
    let newState;
    if(action.type === 'SELECT') {
        newState = Object.assign(
            {},
            state, 
            {selected_id:action.id, mode:'read'});
    } else if(action.type === 'CREATE') {
        let newMaxId = state.max_id + 1;
        let newContents = state.contents.concat();
        newContents.push({
            id:newMaxId,
            title:action.title,
            desc:action.desc
        })
        newState = Object.assign({}, state, {
            max_id:newMaxId,
            contents:newContents,
            mode:'read'
        })
    } else if(action.type === 'DELETE') {
        let newContents = [];
        let i = 0;
        while(i < state.contents.length) {
            if(state.selected_id !== state.contents[i].id) {
                    newContents.push(
                        state.contents[i]
                    );
            }
            i = i+1;
        }
        newState = Object.assign({}, state, {
            contents:newContents,
            mode:'welcome'
        })
    } else if(action.type === 'CHANGE_MODE') {
        newState = Object.assign({}, state, {
            mode:action.mode
        })
    }
    return newState;
}
store.subscribe(article);
store.subscribe(menu);
