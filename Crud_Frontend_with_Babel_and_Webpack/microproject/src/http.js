class EasyHttpAsyncAwait {

  async get(url) {
    const response = await fetch(url);

    const respData = await response.json();
    return respData;
  }

  async post(url, data) {
    const response = await fetch(url,
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }));
    
    const respData = await response.json();
    }

   // Make an HTTP PUT Request
   async put(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    const respData = await response.json();
    
    return respData;
  }

  // Make an HTTP DELETE Request
  async delete(url) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
    const message = 'Async deleted';
    return message;
  }
    
}

export const http = new EasyHttpAsyncAwait();