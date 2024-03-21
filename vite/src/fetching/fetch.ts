export const itemsPerPage = 10;

export const fetchData = async (page: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${itemsPerPage}&_page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  export const fetchPostById = async (id :number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching post details:', error);
      throw error; 
    }
  };
  