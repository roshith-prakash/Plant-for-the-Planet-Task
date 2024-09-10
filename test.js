fetch('https://dummyjson.com/users/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Roshith',
    lastName: 'Prakash',
    username: 'roshithp',
    password: 'roshithppass',
    description: 'ABCD',
    age: 21,
    /* other user data */
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .then(() => {
    fetch('https://dummyjson.com/users/209')
      .then((res) => res.json())
      .then(console.log);
  });

console.log(new Date('1996-5-30').toDateString());
