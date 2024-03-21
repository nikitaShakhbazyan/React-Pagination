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