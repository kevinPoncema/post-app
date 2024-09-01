export interface PostData {
    postId: number;
    postContent: string;
    postTitle: string;
}

export async function getPost(){
    const response = await  fetch("http://localhost:3003/dataExemle")
    if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data:PostData[] = await response.json()
    return data
}