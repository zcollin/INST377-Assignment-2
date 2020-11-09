//Server Call
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

  //Functions

function findMatches(wordToMatch, restaurantList) {
    return restaurantList.filter(restaurant => {
        const regex = new RegExp(wordToMatch, 'gi');
        return restaurant.name.match(regex) || restaurant.category.match(regex)
    });
}

  function runThisAfterEvent(input, jsonFromServer) {
    // console.log('jsonFromServer', jsonFromServer);
    sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
    // Process your restaurants list
    const matchArray = findMatches(input, jsonFromServer);

    ul = document.querySelector('ul')
    ul.innerHTML = '';

    matchArray.forEach((el, i) => {
      let li = document.createElement('li');
      let li2 = document.createElement('li2');
      let li3 = document.createElement('li3');
      let li4 = document.createElement('li4');


      li.innerHTML = (`<span class="name">${el.name}</span><br>`);
      li2.innerHTML = (`<span class="category">${el.category}</span><br>`);
      li3.innerHTML = (`<span class="address">${el.address_line_1}<br>${el.city}</span><br>`);
      li4.innerHTML = (`<span class="zip">${el.zip}\n</span><br>`);
      li.append(li2);
      li.append(li3);
      li.append(li4);

      ul.append(li);
    });
  }
  
  document.body.addEventListener('input', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    input = document.querySelector('input').value;
    console.log(input);
    if(input == '') {
      ul = document.querySelector('ul')
      ul.innerHTML = '';
    } else {
      runThisAfterEvent(input,jsonList)
    }
  });