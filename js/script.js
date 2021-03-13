async function connectionWithRobot(database)  {
  let acess  = await fetch(database);
  let result = await acess.json();
    return result
}

async function start() {
  const database = '../database/robot.json'
  const Robot = await connectionWithRobot(database);
  console.log(Robot)
}



window.onload = start;