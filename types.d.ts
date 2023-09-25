
export interface Gif{
    id:string,
    url:string
}

export type Dispatch<A> = (action: A) => A;
export interface State  {
    page: number;
    gifs: Gif[];
    loading: boolean;
    action: string;
    keyword: string;
  }

  interface Action {
    type: string;
    payload?:string | boolean | Gif[]
      

    
  }

