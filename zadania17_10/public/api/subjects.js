const subjects = [
    {
      id: "1", 
      name: "Matematyka", 
      hoursAWeek: "5"
    },
    {
      id: "2", 
      name: "Informatyka", 
      hoursAWeek: "2"
    },
    {
      id: "3", 
      name: "Język Polski", 
      hoursAWeek: "3"
    },
    {
      id: "4", 
      name: "Jęyzk hiszpański", 
      hoursAWeek: "1"
    },
    {
      id: "5", 
      name: "Język angielski", 
      hoursAWeek: "3"
    },
    {
      id: "6", 
      name: "Wychowanie fizyczne", 
      hoursAWeek: "3"
    },
    {
      id: "7", 
      name: "Etyka", 
      hoursAWeek: "2"
    },
    {
      id: "8", 
      name: "Religia", 
      hoursAWeek: "1"
    },
    {
      id: "9", 
      name: "Geografia", 
      hoursAWeek: "1"
    },
    {
      id: "10", 
      name: "Chemia", 
      hoursAWeek: "1"
    }
  ]
   
  
  app.get('/', (req, res) => {
    res.send(`
      <h1>Strona główna</h1>
      <p>Otwieram okno chłonąc zew morza,rześki wiatr, wielki świat, wodne bezdroża to tylko mały ja kontra ogrom przestworza i młodzi chłopcy, co pakują sobie biel w nozdrza</p>
    `);
  });
module.exports = subjects