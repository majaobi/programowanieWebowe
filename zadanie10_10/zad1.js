function generateRandomNumbers(count) {
    const numbers = [];
  
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (2137 - (-420) + 1) + (-420));
      numbers.push(randomNumber);
    }
  
    return numbers;
  }
  
  function writeRandomNumbersToFile(numbers) {
    const timestamp = Date.now();
    const fileName = `random-${timestamp}.txt`;
  
    fs.writeFileSync(fileName, numbers.join('\n'));
  
    console.log(`Zapisano ${numbers.length} losowych liczb do pliku ${fileName}`);
  }
  
  const count = 20;
  const randomNumbers = generateRandomNumbers(count);
  writeRandomNumbersToFile(randomNumbers);
  
  
  
  
  