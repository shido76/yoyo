if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(serviceWorker => {
      console.log('Service Worker registered: ' + serviceWorker)
    })
    .catch(error => {
      console.log('Error registering the Service Worker: ' + error)
    })
}

document.addEventListener('alpine:init', () => {
  Alpine.data('timer', () => ({
    executeTimerId: null,
    counterTimerId: null,
    counter: 0,
    users: [],
    userName: "",
    userId: 1,
    levels: {
          '1.1': { duration: 9000, distance: 20, vo2: 0, runs: 0, speed: 8 }, 
          '1.2': { duration: 9000, distance: 40, vo2: 0, runs: 0, speed: 8 }, 
          '1.3': { duration: 9000, distance: 60, vo2: 0, runs: 0, speed: 8 }, 
          '1.4': { duration: 9000, distance: 80, vo2: 0, runs: 0, speed: 8 }, 
          '1.5': { duration: 9000, distance: 100, vo2: 0, runs: 0, speed: 8 }, 
          '1.6': { duration: 9000, distance: 120, vo2: 0, runs: 0, speed: 8 }, 
          '1.7': { duration: 9000, distance: 140, vo2: 0, runs: 0, speed: 8 },
          '2.1': { duration: 8470, distance: 160, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.2': { duration: 8470, distance: 180, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.3': { duration: 8470, distance: 200, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.4': { duration: 8470, distance: 220, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.5': { duration: 8470, distance: 240, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.6': { duration: 8470, distance: 260, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.7': { duration: 8470, distance: 280, vo2: 0, runs: 0, speed: 8.5 }, 
          '2.8': { duration: 8470, distance: 300, vo2: 0, runs: 0, speed: 8.5 },
          '3.1': { duration: 8000, distance: 320, vo2: 0, runs: 0, speed: 9 }, 
          '3.2': { duration: 8000, distance: 340, vo2: 0, runs: 0, speed: 9 }, 
          '3.3': { duration: 8000, distance: 360, vo2: 0, runs: 0, speed: 9 }, 
          '3.4': { duration: 8000, distance: 380, vo2: 0, runs: 0, speed: 9 }, 
          '3.5': { duration: 8000, distance: 400, vo2: 0, runs: 0, speed: 9 }, 
          '3.6': { duration: 8000, distance: 420, vo2: 0, runs: 0, speed: 9 }, 
          '3.7': { duration: 8000, distance: 440, vo2: 0, runs: 0, speed: 9 }, 
          '3.8': { duration: 8000, distance: 460, vo2: 0, runs: 0, speed: 9 },
          '4.1': { duration: 7580, distance: 480, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.2': { duration: 7580, distance: 500, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.3': { duration: 7580, distance: 520, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.4': { duration: 7580, distance: 540, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.5': { duration: 7580, distance: 560, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.6': { duration: 7580, distance: 580, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.7': { duration: 7580, distance: 600, vo2: 0, runs: 0, speed: 9.5 }, 
          '4.8': { duration: 7580, distance: 620, vo2: 0, runs: 0, speed: 9.5 },
          '5.1': { duration: 7200, distance: 640, vo2: 26.5, runs: 32, speed: 10 }, 
          '5.2': { duration: 7200, distance: 660, vo2: 26.9, runs: 33, speed: 10 }, 
          '5.3': { duration: 7200, distance: 680, vo2: 27.3, runs: 34, speed: 10 }, 
          '5.4': { duration: 7200, distance: 700, vo2: 27.7, runs: 35, speed: 10 }, 
          '5.5': { duration: 7200, distance: 720, vo2: 28.1, runs: 36, speed: 10 }, 
          '5.6': { duration: 7200, distance: 740, vo2: 28.5, runs: 37, speed: 10 }, 
          '5.7': { duration: 7200, distance: 760, vo2: 29.0, runs: 38, speed: 10 }, 
          '5.8': { duration: 7200, distance: 780, vo2: 29.4, runs: 39, speed: 10 }, 
          '5.9': { duration: 7200, distance: 800, vo2: 29.8, runs: 40, speed: 10 },
          '6.1': { duration: 6860, distance: 820, vo2: 30.2, runs: 41, speed: 10.5 }, 
          '6.2': { duration: 6860, distance: 840, vo2: 30.6, runs: 42, speed: 10.5 }, 
          '6.3': { duration: 6860, distance: 860, vo2: 31, runs: 43, speed: 10.5 }, 
          '6.4': { duration: 6860, distance: 880, vo2: 31.4, runs: 44, speed: 10.5 }, 
          '6.5': { duration: 6860, distance: 900, vo2: 31.8, runs: 45, speed: 10.5 }, 
          '6.6': { duration: 6860, distance: 920, vo2: 32.2, runs: 46, speed: 10.5 }, 
          '6.7': { duration: 6860, distance: 940, vo2: 32.6, runs: 47, speed: 10.5 }, 
          '6.8': { duration: 6860, distance: 960, vo2: 33, runs: 48, speed: 10.5 }, 
          '6.9': { duration: 6860, distance: 980, vo2: 33.4, runs: 49, speed: 10.5 },
          '7.1': { duration: 6550, distance: 1000, vo2: 33.7, runs: 50, speed: 11 }, 
          '7.2': { duration: 6550, distance: 1020, vo2: 34.1, runs: 51, speed: 11 }, 
          '7.3': { duration: 6550, distance: 1040, vo2: 34.5, runs: 52, speed: 11 }, 
          '7.4': { duration: 6550, distance: 1060, vo2: 34.8, runs: 53, speed: 11 }, 
          '7.5': { duration: 6550, distance: 1080, vo2: 35.2, runs: 54, speed: 11 }, 
          '7.6': { duration: 6550, distance: 1100, vo2: 35.5, runs: 55, speed: 11 }, 
          '7.7': { duration: 6550, distance: 1120, vo2: 35.9, runs: 56, speed: 11 }, 
          '7.8': { duration: 6550, distance: 1140, vo2: 36.2, runs: 57, speed: 11 }, 
          '7.9': { duration: 6550, distance: 1160, vo2: 36.6, runs: 58, speed: 11 }, 
          '7.10': { duration: 6550, distance: 1180, vo2: 36.9, runs: 59, speed: 11 },
          '8.1': { duration: 6260, distance: 1200, vo2: 37.3, runs: 60, speed: 11.5 }, 
          '8.2': { duration: 6260, distance: 1220, vo2: 37.6, runs: 61, speed: 11.5 }, 
          '8.3': { duration: 6260, distance: 1240, vo2: 38, runs: 62, speed: 11.5 }, 
          '8.4': { duration: 6260, distance: 1260, vo2: 38.3, runs: 63, speed: 11.5 }, 
          '8.5': { duration: 6260, distance: 1280, vo2: 38.7, runs: 64, speed: 11.5 }, 
          '8.6': { duration: 6260, distance: 1300, vo2: 39, runs: 65, speed: 11.5 }, 
          '8.7': { duration: 6260, distance: 1320, vo2: 39.4, runs: 66, speed: 11.5 }, 
          '8.8': { duration: 6260, distance: 1340, vo2: 39.7, runs: 67, speed: 11.5 }, 
          '8.9': { duration: 6260, distance: 1360, vo2: 40.1, runs: 68, speed: 11.5 }, 
          '8.10': { duration: 6260, distance: 1380, vo2: 40.4, runs: 69, speed: 11.5 },
          '9.1': { duration: 6000, distance: 1400, vo2: 40.7, runs: 70, speed: 12 },
          '9.2': { duration: 6000, distance: 1420, vo2: 41, runs: 71, speed: 12 }, 
          '9.3': { duration: 6000, distance: 1440, vo2: 41.4, runs: 72, speed: 12 }, 
          '9.4': { duration: 6000, distance: 1460, vo2: 41.7, runs: 73, speed: 12 }, 
          '9.5': { duration: 6000, distance: 1480, vo2: 42, runs: 74, speed: 12 }, 
          '9.6': { duration: 6000, distance: 1500, vo2: 42.3, runs: 75, speed: 12 }, 
          '9.7': { duration: 6000, distance: 1520, vo2: 42.6, runs: 76, speed: 12 }, 
          '9.8': { duration: 6000, distance: 1540, vo2: 42.9, runs: 77, speed: 12 }, 
          '9.9': { duration: 6000, distance: 1560, vo2: 43.2, runs: 78, speed: 12 }, 
          '9.10': { duration: 6000, distance: 1580, vo2: 43.5, runs: 79, speed: 12 }, 
          '9.11': { duration: 6000, distance: 1600, vo2: 43.9, runs: 80, speed: 12 },
          '10.1': { duration: 5760, distance: 1620, vo2: 44.2, runs: 81, speed: 12.5 }, 
          '10.2': { duration: 5760, distance: 1640, vo2: 44.5, runs: 82, speed: 12.5 }, 
          '10.3': { duration: 5760, distance: 1660, vo2: 44.8, runs: 83, speed: 12.5 }, 
          '10.4': { duration: 5760, distance: 1680, vo2: 45.1, runs: 84, speed: 12.5 }, 
          '10.5': { duration: 5760, distance: 1700, vo2: 45.4, runs: 85, speed: 12.5 }, 
          '10.6': { duration: 5760, distance: 1720, vo2: 45.7, runs: 86, speed: 12.5 }, 
          '10.7': { duration: 5760, distance: 1740, vo2: 46, runs: 87, speed: 12.5 }, 
          '10.8': { duration: 5760, distance: 1760, vo2: 46.3, runs: 88, speed: 12.5 }, 
          '10.9': { duration: 5760, distance: 1780, vo2: 46.7, runs: 89, speed: 12.5 }, 
          '10.10': { duration: 5760, distance: 1800, vo2: 47, runs: 90, speed: 12.5 }, 
          '10.11': { duration: 5760, distance: 1820, vo2: 47.3, runs: 91, speed: 13 },
          '11.1': { duration: 5540, distance: 1840, vo2: 47.6, runs: 92, speed: 13 }, 
          '11.2': { duration: 5540, distance: 1860, vo2: 47.9, runs: 93, speed: 13 }, 
          '11.3': { duration: 5540, distance: 1880, vo2: 48.2, runs: 94, speed: 13 }, 
          '11.4': { duration: 5540, distance: 1900, vo2: 48.5, runs: 95, speed: 13 }, 
          '11.5': { duration: 5540, distance: 1920, vo2: 48.8, runs: 96, speed: 13 }, 
          '11.6': { duration: 5540, distance: 1940, vo2: 49.1, runs: 97, speed: 13 }, 
          '11.7': { duration: 5540, distance: 1960, vo2: 49.4, runs: 98, speed: 13 }, 
          '11.8': { duration: 5540, distance: 1980, vo2: 49.8, runs: 99, speed: 13 }, 
          '11.9': { duration: 5540, distance: 2000, vo2: 50.1, runs: 100, speed: 13 }, 
          '11.10': { duration: 5540, distance: 2020, vo2: 50.4, runs: 101, speed: 13 }, 
          '11.11': { duration: 5540, distance: 2040, vo2: 50.7, runs: 102, speed: 13 },
          '12.1': { duration: 5330, distance: 2060, vo2: 51, runs: 103, speed: 13.5 }, 
          '12.2': { duration: 5330, distance: 2080, vo2: 51.3, runs: 104, speed: 13.5 }, 
          '12.3': { duration: 5330, distance: 2100, vo2: 51.5, runs: 105, speed: 13.5 }, 
          '12.4': { duration: 5330, distance: 2120, vo2: 51.8, runs: 106, speed: 13.5 }, 
          '12.5': { duration: 5330, distance: 2140, vo2: 52.1, runs: 107, speed: 13.5 }, 
          '12.6': { duration: 5330, distance: 2160, vo2: 52.4, runs: 108, speed: 13.5 }, 
          '12.7': { duration: 5330, distance: 2180, vo2: 52.7, runs: 109, speed: 13.5 }, 
          '12.8': { duration: 5330, distance: 2200, vo2: 53, runs: 110, speed: 13.5 }, 
          '12.9': { duration: 5330, distance: 2220, vo2: 53.2, runs: 111, speed: 13.5 }, 
          '12.10': { duration: 5330, distance: 2240, vo2: 53.5, runs: 112, speed: 13.5 }, 
          '12.11': { duration: 5330, distance: 2260, vo2: 53.8, runs: 113, speed: 13.5 }, 
          '12.12': { duration: 5330, distance: 2280, vo2: 54.1, runs: 114, speed: 13.5 },
          '13.1': { duration: 5140, distance: 2300, vo2: 54.4, runs: 115, speed: 14 }, 
          '13.2': { duration: 5140, distance: 2320, vo2: 54.7, runs: 116, speed: 14 }, 
          '13.3': { duration: 5140, distance: 2340, vo2: 55, runs: 117, speed: 14 }, 
          '13.4': { duration: 5140, distance: 2360, vo2: 55.2, runs: 118, speed: 14 }, 
          '13.5': { duration: 5140, distance: 2380, vo2: 55.5, runs: 119, speed: 14 }, 
          '13.6': { duration: 5140, distance: 2400, vo2: 55.8, runs: 120, speed: 14 }, 
          '13.7': { duration: 5140, distance: 2420, vo2: 56.1, runs: 121, speed: 14 }, 
          '13.8': { duration: 5140, distance: 2440, vo2: 56.4, runs: 122, speed: 14 }, 
          '13.9': { duration: 5140, distance: 2460, vo2: 56.7, runs: 123, speed: 14 }, 
          '13.10': { duration: 5140, distance: 2480, vo2: 57, runs: 124, speed: 14 }, 
          '13.11': { duration: 5140, distance: 2500, vo2: 57.3, runs: 125, speed: 14 }, 
          '13.12': { duration: 5140, distance: 2520, vo2: 57.5, runs: 126, speed: 14 },
          '14.1': { duration: 4970, distance: 2540, vo2: 57.8, runs: 127, speed: 14.5 }, 
          '14.2': { duration: 4970, distance: 2560, vo2: 58.1, runs: 128, speed: 14.5 }, 
          '14.3': { duration: 4970, distance: 2580, vo2: 58.3, runs: 129, speed: 14.5 }, 
          '14.4': { duration: 4970, distance: 2600, vo2: 58.6, runs: 130, speed: 14.5 }, 
          '14.5': { duration: 4970, distance: 2620, vo2: 58.9, runs: 131, speed: 14.5 }, 
          '14.6': { duration: 4970, distance: 2640, vo2: 59.1, runs: 132, speed: 14.5 }, 
          '14.7': { duration: 4970, distance: 2660, vo2: 59.4, runs: 133, speed: 14.5 }, 
          '14.8': { duration: 4970, distance: 2680, vo2: 59.7, runs: 134, speed: 14.5 }, 
          '14.9': { duration: 4970, distance: 2700, vo2: 59.9, runs: 135, speed: 14.5 }, 
          '14.10': { duration: 4970, distance: 2720, vo2: 60.2, runs: 136, speed: 14.5 }, 
          '14.11': { duration: 4970, distance: 2740, vo2: 60.5, runs: 137, speed: 14.5 }, 
          '14.12': { duration: 4970, distance: 2760, vo2: 60.8, runs: 138, speed: 14.5 }, 
          '14.13': { duration: 4970, distance: 2780, vo2: 61, runs: 139, speed: 14.5 },
          '15.1': { duration: 4800, distance: 2800, vo2: 61.3, runs: 140, speed: 15 }, 
          '15.2': { duration: 4800, distance: 2820, vo2: 61.6, runs: 141, speed: 15 }, 
          '15.3': { duration: 4800, distance: 2840, vo2: 61.8, runs: 142, speed: 15 }, 
          '15.4': { duration: 4800, distance: 2860, vo2: 62.1, runs: 143, speed: 15 }, 
          '15.5': { duration: 4800, distance: 2880, vo2: 62.4, runs: 144, speed: 15 }, 
          '15.6': { duration: 4800, distance: 2900, vo2: 62.6, runs: 145, speed: 15 }, 
          '15.7': { duration: 4800, distance: 2920, vo2: 62.9, runs: 146, speed: 15 }, 
          '15.8': { duration: 4800, distance: 2940, vo2: 63.2, runs: 147, speed: 15 }, 
          '15.9': { duration: 4800, distance: 2960, vo2: 63.5, runs: 148, speed: 15 }, 
          '15.10': { duration: 4800, distance: 2980, vo2: 63.7, runs: 149, speed: 15 }, 
          '15.11': { duration: 4800, distance: 3000, vo2: 64, runs: 150, speed: 15 }, 
          '15.12': { duration: 4800, distance: 3020, vo2: 64.3, runs: 151, speed: 15 }, 
          '15.13': { duration: 4800, distance: 3040, vo2: 64.6, runs: 152, speed: 15 },
          '16.1': { duration: 4650, distance: 3060, vo2: 64.8, runs: 153, speed: 15.5 }, 
          '16.2': { duration: 4650, distance: 3080, vo2: 65.1, runs: 154, speed: 15.5 }, 
          '16.3': { duration: 4650, distance: 3100, vo2: 65.4, runs: 155, speed: 15.5 }, 
          '16.4': { duration: 4650, distance: 3120, vo2: 65.7, runs: 156, speed: 15.5 }, 
          '16.5': { duration: 4650, distance: 3140, vo2: 65.9, runs: 157, speed: 15.5 }, 
          '16.6': { duration: 4650, distance: 3160, vo2: 66.2, runs: 158, speed: 15.5 }, 
          '16.7': { duration: 4650, distance: 3180, vo2: 66.5, runs: 159, speed: 15.5 }, 
          '16.8': { duration: 4650, distance: 3200, vo2: 66.8, runs: 160, speed: 15.5 }, 
          '16.9': { duration: 4650, distance: 3220, vo2: 67.1, runs: 161, speed: 15.5 }, 
          '16.10': { duration: 4650, distance: 3240, vo2: 67.3, runs: 162, speed: 15.5 }, 
          '16.11': { duration: 4650, distance: 3260, vo2: 67.6, runs: 163, speed: 15.5 }, 
          '16.12': { duration: 4650, distance: 3280, vo2: 67.9, runs: 164, speed: 15.5 }, 
          '16.13': { duration: 4650, distance: 3300, vo2: 68.2, runs: 165, speed: 15.5 },
          '17.1': { duration: 4500, distance: 3320, vo2: 68.4, runs: 166, speed: 16 }, 
          '17.2': { duration: 4500, distance: 3340, vo2: 68.7, runs: 167, speed: 16 }, 
          '17.3': { duration: 4500, distance: 3360, vo2: 69, runs: 168, speed: 16 }, 
          '17.4': { duration: 4500, distance: 3380, vo2: 69.2, runs: 169, speed: 16 }, 
          '17.5': { duration: 4500, distance: 3400, vo2: 69.5, runs: 170, speed: 16 }, 
          '17.6': { duration: 4500, distance: 3420, vo2: 69.8, runs: 171, speed: 16 }, 
          '17.7': { duration: 4500, distance: 3440, vo2: 70, runs: 172, speed: 16 }, 
          '17.8': { duration: 4500, distance: 3460, vo2: 70.3, runs: 173, speed: 16 }, 
          '17.9': { duration: 4500, distance: 3480, vo2: 70.6, runs: 174, speed: 16 }, 
          '17.10': { duration: 4500, distance: 3500, vo2: 70.8, runs: 175, speed: 16 }, 
          '17.11': { duration: 4500, distance: 3520, vo2: 71.1, runs: 176, speed: 16 }, 
          '17.12': { duration: 4500, distance: 3540, vo2: 71.4, runs: 177, speed: 16 }, 
          '17.13': { duration: 4500, distance: 3560, vo2: 71.6, runs: 178, speed: 16 }, 
          '17.14': { duration: 4500, distance: 3580, vo2: 71.9, runs: 179, speed: 16 },
          '18.1': { duration: 4360, distance: 3600, vo2: 72.2, runs: 180, speed: 16.5 }, 
          '18.2': { duration: 4360, distance: 3620, vo2: 72.4, runs: 181, speed: 16.5 }, 
          '18.3': { duration: 4360, distance: 3640, vo2: 72.7, runs: 182, speed: 16.5 }, 
          '18.4': { duration: 4360, distance: 3660, vo2: 73, runs: 183, speed: 16.5 }, 
          '18.5': { duration: 4360, distance: 3680, vo2: 73.2, runs: 184, speed: 16.5 }, 
          '18.6': { duration: 4360, distance: 3700, vo2: 73.5, runs: 185, speed: 16.5 }, 
          '18.7': { duration: 4360, distance: 3720, vo2: 73.8, runs: 186, speed: 16.5 }, 
          '18.8': { duration: 4360, distance: 3740, vo2: 74.1, runs: 187, speed: 16.5 }, 
          '18.9': { duration: 4360, distance: 3760, vo2: 74.3, runs: 188, speed: 16.5 }, 
          '18.10': { duration: 4360, distance: 3780, vo2: 74.6, runs: 189, speed: 16.5 }, 
          '18.11': { duration: 4360, distance: 3800, vo2: 74.9, runs: 190, speed: 16.5 }, 
          '18.12': { duration: 4360, distance: 3820, vo2: 75.2, runs: 191, speed: 16.5 }, 
          '18.13': { duration: 4360, distance: 3840, vo2: 75.4, runs: 192, speed: 16.5 }, 
          '18.14': { duration: 4360, distance: 3860, vo2: 75.7, runs: 193, speed: 16.5 },
          '19.1': { duration: 4240, distance: 3880, vo2: 76, runs: 194, speed: 17 },
          '19.2': { duration: 4240, distance: 3900, vo2: 76.2, runs: 195, speed: 17 }, 
          '19.3': { duration: 4240, distance: 3920, vo2: 76.5, runs: 196, speed: 17 }, 
          '19.4': { duration: 4240, distance: 3940, vo2: 76.7, runs: 197, speed: 17 }, 
          '19.5': { duration: 4240, distance: 3960, vo2: 77, runs: 198, speed: 17 }, 
          '19.6': { duration: 4240, distance: 3980, vo2: 77.3, runs: 199, speed: 17 }, 
          '19.7': { duration: 4240, distance: 4000, vo2: 77.5, runs: 200, speed: 17 }, 
          '19.8': { duration: 4240, distance: 4020, vo2: 77.8, runs: 201, speed: 17 }, 
          '19.9': { duration: 4240, distance: 4040, vo2: 78.1, runs: 202, speed: 17 }, 
          '19.10': { duration: 4240, distance: 4060, vo2: 78.3, runs: 203, speed: 17 }, 
          '19.11': { duration: 4240, distance: 4080, vo2: 78.6, runs: 204, speed: 17 }, 
          '19.12': { duration: 4240, distance: 4100, vo2: 78.8, runs: 205, speed: 17 }, 
          '19.13': { duration: 4240, distance: 4120, vo2: 79.1, runs: 206, speed: 17 }, 
          '19.14': { duration: 4240, distance: 4140, vo2: 79.4, runs: 207, speed: 17 }, 
          '19.15': { duration: 4240, distance: 4160, vo2: 79.6, runs: 208, speed: 17 },
          '20.1': { duration: 4110, distance: 4180, vo2: 79.9, runs: 209, speed: 17.5 }, 
          '20.2': { duration: 4110, distance: 4200, vo2: 80.2, runs: 210, speed: 17.5 }, 
          '20.3': { duration: 4110, distance: 4220, vo2: 80.5, runs: 211, speed: 17.5 }, 
          '20.4': { duration: 4110, distance: 4240, vo2: 80.7, runs: 212, speed: 17.5 }, 
          '20.5': { duration: 4110, distance: 4260, vo2: 81, runs: 213, speed: 17.5 }, 
          '20.6': { duration: 4110, distance: 4280, vo2: 81.3, runs: 214, speed: 17.5 }, 
          '20.7': { duration: 4110, distance: 4300, vo2: 81.5, runs: 215, speed: 17.5 }, 
          '20.8': { duration: 4110, distance: 4320, vo2: 81.8, runs: 216, speed: 17.5 }, 
          '20.9': { duration: 4110, distance: 4340, vo2: 82.1, runs: 217, speed: 17.5 }, 
          '20.10': { duration: 4110, distance: 4360, vo2: 82.4, runs: 218, speed: 17.5 }, 
          '20.11': { duration: 4110, distance: 4380, vo2: 82.6, runs: 219, speed: 17.5 }, 
          '20.12': { duration: 4110, distance: 4400, vo2: 82.9, runs: 220, speed: 17.5 }, 
          '20.13': { duration: 4110, distance: 4420, vo2: 83.2, runs: 221, speed: 17.5 }, 
          '20.14': { duration: 4110, distance: 4440, vo2: 83.5, runs: 222, speed: 17.5 }, 
          '20.15': { duration: 4110, distance: 4460, vo2: 83.7, runs: 223, speed: 17.5 },
        },
    currentLevel: null,
    startCounter: null,
    disableStartButton: true,
    disableStopButton: true,
    disableAddUserButton: false,
    addUsers() {
      if (this.userName === "") return
      this.users.push({ 
        id: this.userId, 
        name: this.userName.toUpperCase(), 
        level: 0, 
        distance: 0,
        duration: 0,
        speed: 0,
        vo2: 0, 
        runs: 0, 
        stopped: false 
      })
      this.userId++
      this.userName = ""
      this.disableStartButton = false
    },
    stopAll() {
      this.$dispatch('stopall')
      clearTimeout(this.executeTimerId)
      clearInterval(this.counterTimerId)
      this.startCounter = null
      this.disableStartButton = false
      this.disableStopButton = true
    },
    start() {
      this.$dispatch('startall')
      this.counter = 0
      this.currentLevel = null
      this.startCounter = null
      this.disableStartButton = true
      this.disableStopButton = false
      this.users.forEach(user => user.stopped = false)

      // const worker = new Worker('worker.js')

      // worker.addEventListener('message', function (e) {
      //   //console.log('web worker returned', e.data)
      //   this.executeTimerId = e.data
      // })

      // repeat interval for repetitions times
      const setIntervalN = (callback, delay, repetitions) => {
        let n = 1
        const intervalID = setInterval(_ => {
          callback(n)
          n++

          if (n > repetitions) {
            clearInterval(intervalID)
          }
        }, delay)
        return intervalID
      }

      const changeDuration = _ => this.levels[this.currentLevel]['duration']

      const execute = _ => {
        if (this.counter < Object.keys(this.levels).length) {
          this.currentLevel = Object.keys(this.levels)[this.counter]

          let audio = new Audio(`audio/level-${this.currentLevel}.mp3`)
          audio.play()

          console.log(changeDuration(), this.currentLevel)
          this.executeTimerId = setTimeout(execute, changeDuration())
        } else {
          this.currentLevel = 'Finish'
          this.stopAll()
          audio = new Audio('audio/finish.mp3')
          audio.play()
          
          setTimeout(() => {
            audio = new Audio('audio/end-yoyo.mp3')
            audio.play()  
          }, 2000)
        }
        this.counter++
      }

      this.counterTimerId = setIntervalN(n => {
        const audio = (n === 5) ? new Audio('audio/pi-last.m4a') : new Audio('audio/pi.m4a')
        audio.play()

        this.startCounter = n
        console.log(this.startCounter)

        if (n === 5) {
          execute()
        }
      }, 1000, 5)
    }
  }))
  
  Alpine.data('player', () => ({
    stopped: false,
    toggle(index) {
      if (!this.currentLevel) return
      this.stopped = !this.stopped
      if (this.stopped) {
        this.users[index]['stopped'] = false
        this.save(index)
      }
    },
    start() {
      this.stopped = false
    },
    stop(index) {
      if (!this.currentLevel) return
      this.stopped = true
      this.save(index)
    },
    save(index) {
      if (!this.users[index]['stopped']) {
        // always save previous level
        const counter = (this.counter === 1 || this.currentLevel === 'Finish') ? this.counter - 1 : this.counter - 2
        const currentLevel = Object.keys(this.levels)[counter]

        this.users[index]['level'] = currentLevel
        this.users[index]['distance'] = this.levels[currentLevel]['distance']
        this.users[index]['duration'] = this.levels[currentLevel]['duration'] / 1000
        this.users[index]['speed'] = this.levels[currentLevel]['speed']
        this.users[index]['vo2'] = this.levels[currentLevel]['vo2']
        this.users[index]['runs'] = this.levels[currentLevel]['runs']
        this.users[index]['stopped'] = true
        console.log(this.users[index])
      }
    },
  }))
})

