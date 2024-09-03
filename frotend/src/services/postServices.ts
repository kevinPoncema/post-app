export interface PostData {
    content: string;
    title: string;
    _id:string;
}

export async function getPost(){
    const response = await  fetch("http://localhost:3003/posts")
    if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data:PostData[] = await response.json()
    return data
}

export async function createPost(titulo: string, contenido: string) {
    console.log(titulo, contenido);
    const response = await fetch('http://localhost:3003/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titulo,  
            content: contenido  
        })
    });
    

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: PostData = await response.json();
    return data;
}


export async function deletePostById(id: string) {
    const response = await fetch(`http://localhost:3003/deletePost/${id}`, {
        method: "DELETE",  // Corregido el método HTTP
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: PostData = await response.json();
    return data;
}



