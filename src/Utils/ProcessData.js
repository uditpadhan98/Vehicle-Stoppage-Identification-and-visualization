export const processGPSData = (data, thresholdTime) => {
    let stoppages = [];
    let path = [];
    let Stoppage = null;
  
    data.forEach((point, index) => {
      const { latitude, longitude, timestamp } = point;
      const currentTime = new Date(parseInt(timestamp));
  
      if (index > 0) {
        const previousPoint = data[index - 1];
        const previousTime = new Date(previousPoint.timestamp);
        const timeDifference = (currentTime - previousTime) / (1000 * 60 ); // in minutes
  
        if (timeDifference >= thresholdTime) {
          Stoppage = {
            location: [latitude, longitude],
            reachTime: previousPoint.timestamp,
            endTime: timestamp,
            duration: timeDifference
          };
          stoppages.push(Stoppage);
        } 
      }
  
      path.push([latitude, longitude]);
    });
  
    return { path, stoppages };
  };
  