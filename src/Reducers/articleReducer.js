const INITIALSTATE={
    tab:[],
}

const ArticleReducer=(state=INITIALSTATE,action)=>
{
    switch (action.type)
    {
        case 'LOAD_ARTICLE':
            {
                return {
                    ...state,
                    tab:action.payload
                }
            }

        case 'EMPTY_ARTICLES':
            {
                return {
                    tab:action.payload
                }
            }
        default:
            return state;
    }
}


export default ArticleReducer;

export const allArticlesLoad = () => (dispatch) => {
    try{
        fetch('http://localhost:3001/articles/allArticles',
        {
            method:'GET',
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then(data=> data.json())
        .then(response=>{
            console.log(response);
            dispatch({
                type:"LOAD_ARTICLE",
                payload:response,
            })
        })
    }
    catch(err)
    {
        console.error("the error : " + err)
    }
}
