const urlBase = `https://jsonplaceholder.typicode.com/posts`

let post = []

function getData(){
    fetch(urlBase)
    .then(res => res.json())
    .then(data =>{
        post = data 
        renderPostList()
    })
    .catch(error => console.error(`Error al llamar a la API ${error}`))
}

function renderPostList(){
    const postList = document.getElementById("postList")
    postList.innerHTML = ""

    post.forEach(item => {
        const listItem = document.createElement("li")
        listItem.classList.add("postItem")
        listItem.innerHTML = `
        
        <strong>${item.title}</strong>
        <p>${item.body}</p>
        <button onclick="editPost(${item.id})">Editar</button>
        <button onclick="deletePost(${item.id})">Borrar</button>
        
        <div id="editForm-${item.id}" class="editForm" style="display:none">
            <label for="editTitle">Titulo: </label>
            <input type="text" id="editTitle-${item.id}" value="${item.title}" required>
            <label for="editBody>Comentario: </label>
            <textarea id="editBody-${item.id}" required></textarea>
            <button onclick="updatePost(${item.id}")>Actualizar</button>
        </div>
        `
        postList.appendChild(listItem)
    })
}