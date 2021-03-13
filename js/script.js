async function connectionWithRobot(database)  {
  const acess  = await fetch(database);
  const result = await acess.json();
    return await result
}

async function startRobot(database) {
  return await connectionWithRobot(database);
}


const robot = startRobot('../database/Robot_req.json')
  .then(resolve => {
    
    const question = prompt('Digite algo');

    console.log(resolve[question]);


  })
  .catch(error =>  console.warn('failed connection',error))
