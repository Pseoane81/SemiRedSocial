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

getData()

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
            <label for="editBody">Comentario: </label>
            <textarea id="editBody-${item.id}" required>${item.body}</textarea>
            <button onclick="updatePost(${item.id})">Actualizar</button>
        </div>
        `
        postList.appendChild(listItem)
    })
}

function postData(){
    const postTitleInput = document.getElementById("postTitle")
    const postBodyInput = document.getElementById("postBody")
    const postTitle = postTitleInput.value
    const postBody = postBodyInput.value
    //console.log(postTitle, postBody)


    if(postTitle.trim() == "" || postBody.trim() == "" ){
        alert("Los campos son obligatorios")
        return
    }
    fetch(urlBase, { 
        method: 'POST',
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(res => res.json())
      .then(data => {
        post.unshift(data)
        renderPostList();
        //postTitleInput.value = ""
        //postBodyInput.value = ""
      })
      .catch(error => console.error(`Error al llamar a la API ${error}`))
        }



function editPost(id){
    const editForm = document.getElementById(`editForm-${id}`)
    editForm.style.display = (editForm.style.display == "none") ? "block" : "none"
}

function updatePost(id){
    const editTitle = document.getElementById(`editTitle-${id}`).value
    const editBody = document.getElementById(`editBody-${id}`).value

    fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        id: id,
        title: editTitle,
        body: editBody,
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
  },
    })
    .then(res => res.json())
    .then(data => {
        const index = post.findIndex(post => post.id == data.id)
        if (index != -1){
            post[index] = data
        }else{
            alert("Hubo un error al actualizar")
        }
        renderPostList()
    })
    .catch(error => console.error(`Error al llamar a la API ${error}`))
}

function deletePost(id){
    fetch(`${urlBase}/${id}`, {
        method : "DELETE"
    })
    .then(res => {
        if(res.ok){
            post = post.filter(post => post.id != id)
            renderPostList()
        }else{
            alert("hubo un error al eliminar")
        }
    })
    .catch(error => console.error(`Error al llamar a la API ${error}`))
}