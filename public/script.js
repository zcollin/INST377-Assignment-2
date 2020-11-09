jsonList = [];

fetch('/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
})
  .then((fromServer) => fromServer.json())
  .then((jsonFromServer) => jsonList.push(...jsonFromServer))
  .catch((err) => {
    console.log(err);
  });

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
    const matchArray = findMatches(input, jsonFromServer);
    console.log(matchArray);
  }
  
  // Leave lines 52-67 alone; do your work in the functions above
  document.body.addEventListener('input', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    input = document.querySelector('input').value;
    runThisWithResultsFromServer(input,jsonList)
  });