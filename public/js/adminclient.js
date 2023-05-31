let blogContainer = document.querySelector('.blog-container')

blogContainer.addEventListener('click', async (e)=>{

    let blog = e.target.parentElement
    
    let blogId = blog.id

    

    const editButton = blog.querySelector('.edit-button');
    const deleteButton = blog.querySelector('.delete-button');
    const saveButton = blog.querySelector('.save-button');
    const cancelButton = blog.querySelector('.cancel-button');
    const bodyBlog = blog.querySelector('.blog-body');

    if(e.target === editButton) {
        bodyBlog.readOnly= false;
        editButton.style.display = 'none'
        saveButton.style.display = 'inline'
        cancelButton.style.display = 'inline'

    } else if(e.target === saveButton ){
        bodyBlog.readOnly= true;
        editButton.style.display = 'inline'
        saveButton.style.display = 'none'
        cancelButton.style.display = 'none'
        const content = bodyBlog.value;

        let resultIn  = await fetch(`/admin/edit/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ content}),
        })
        ;
        
    }
    if(e.target === deleteButton){
        let result = await fetch(`/admin/delete/${blogId}`, {
            method: 'DELETE'

        })
        blog.remove()
    }

    if(e.target === cancelButton ){

        bodyBlog.readOnly = true;
        editButton.style.display = 'inline';
        deleteButton.style.display = 'inline';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
    }



})