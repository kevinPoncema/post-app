export interface PostData {
    postId: string;
    content: string;
    title: string;
    enable:boolean
}

export async function getPost(){
    const response = await  fetch("http://localhost:3003/posts")
    if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data:PostData[] = await response.json()
    return data
}