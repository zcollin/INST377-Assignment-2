const fullInput = [];

function findMatches(wordToMatch, restaurantList) {
    return restaurantList.filter(restaurant => {
        const regex = new RegExp(wordToMatch, 'gi');
        return restaurant.name.match(regex) || restaurant.category.match(regex)
    });
}

  function runThisWithResultsFromServer(input, jsonFromServer) {
    // console.log('jsonFromServer', jsonFromServer);
    sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
    // Process your restaurants list
    if(input.data == null) {
      fullInput.pop();
    } else {
      fullInput.push(input.data);
    }
    console.log(fullInput.join(""));
    const matchArray = findMatches(input.data, jsonFromServer);
    console.log(matchArray);
  }
  
  // Leave lines 52-67 alone; do your work in the functions above
  document.body.addEventListener('input', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const input = e;
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => runThisWithResultsFromServer(input, jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
  });